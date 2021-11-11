import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { AuditoriaClientesService } from 'src/app/services/auditoria-clientes.service';
import { RolService } from 'src/app/services/rol.service';
import { HttpClient } from '@angular/common/http';
import { ExcelService } from 'src/app/services/excel.service';
import * as XLSX from 'xlsx'; 
import { JsontocsvService } from 'src/app/services/jsontocsv.service';
import { AuditoriaIVAService } from 'src/app/services/auditoria-iva.service';
import { SituacionesIVAService } from 'src/app/services/situacion-iva.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { FileSaverService } from 'ngx-filesaver';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {
  empleados: any[] = [];
  createEmpleado: FormGroup;
  fileName= 'Clientes.xlsx';
  ipAddress:any
  auditoriaclientes: any[] = [];
  auditoriaiva: any[] = [];
  empleadoss: any[] = [];
  situacioniva: any[] = [];
  usuarios: any[] = [];

  constructor(private fb: FormBuilder,
              private _empleadoService: EmpleadoService,
              private toastr: ToastrService,
              private firestore: AngularFirestore, 
              private _auditoriaService: AuditoriaClientesService,
              private _auditoriaIVAService: AuditoriaIVAService,
              private _situacionIVA:SituacionesIVAService,
              private _usuarios:UsuariosService,
              private filesaver:FileSaverService,
              private http:HttpClient,
              private router: Router,
              private rol: RolService,
              private _empresaService: EmpresaService) {
              this.createEmpleado = this.fb.group({
                nombre: ['', Validators.required],
                apellido: ['', Validators.required],
                dni: ['', Validators.required],
                direccion: ['', Validators.required],
                celular: ['', Validators.required],
                ciudad: ['', Validators.required],
                iva:['', Validators.required]
              })
              this.http.get<{ip:string}>('https://jsonip.com')
              .subscribe( data => {
              //console.log('th data', data);
              this.ipAddress = data.ip
              })

              window.addEventListener('keydown', (event) => {
                if (event.keyCode === 112) {
                    event.preventDefault();
                    const modal = document.getElementById('modal-one');
                    modal!.classList.add('open');
                    var exits = modal!.querySelectorAll('.modal-exit');
                    exits.forEach(function(exit) {
                        exit.addEventListener('click', function(event) {
                                event.preventDefault();
                                modal!.classList.remove('open');
                              });    
                        });
                }
            });
  }

  ngOnInit(): void {
    this.getEmpleados();
    this.starterBackup();
    //Asi se obtiene el rol
    //console.log(this.rol.getRol())  
  }

  exportexcel(): void 
  {
     /* table id is passed over here */   
     let element = document.getElementById('excel-table'); 
     const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

     /* generate workbook and add the worksheet */
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

     /* save to file */
     XLSX.writeFile(wb, this.fileName);
  }

  getEmpleados() {
    this._empleadoService.getEmpleados().subscribe(data => {
      this.empleados = [];
      data.forEach((element: any) => {
        this.empleados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      //console.log(this.empleados);
    });
  }

  eliminarEmpleado(id: string) {
    if( this.rol.getRol() != 4){
      this._empleadoService.getEmpleado(id).subscribe(data => {
        this.createEmpleado.setValue({
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          dni: data.payload.data()['dni'],
          direccion: data.payload.data()['direccion'],
          celular: data.payload.data()['celular'],
          ciudad: data.payload.data()['ciudad'],
          iva: data.payload.data()['iva']
        })
      })
      this._empleadoService.eliminarEmpleado(id).then(() => {
        const audit_subs = this._auditoriaService.getNumopr().subscribe((num:any) =>{  
          const auditoriacliente: any = {
            numoprA: num.length > 0 ? num[0]['numoprA'] + 1 : 1,
            tipooprA: 'Baja',
            usuarioA: this.rol.getUsuario(),
            terminalA: this.ipAddress,
            fechahoraA: new Date().toDateString()+ ' ' +new Date().getHours()+ ':' +new Date().getMinutes()+ ':' +new Date().getSeconds(), 
            dniA: this.createEmpleado.value.dni,
            descA: 'Se ha eliminado el registro: ' + this.createEmpleado.value.dni + '.',
          }
          this._auditoriaService.agregarAuditoriaClientes(auditoriacliente);
          audit_subs.unsubscribe();
          this.toastr.error('El cliente fue eliminado con exito', 'Registro eliminado!', {
            positionClass: 'toast-bottom-right'
          });
        })    
      }).catch(error => {
        console.log(error);
      })
    } else {alert('No tienes los privilegios para ejecutar esta Acción.')}
  
  }


  starterBackup(){
    this._auditoriaService.getAuditoriaClientes().subscribe(data => {
      this.auditoriaclientes = [];
      data.forEach((element: any) => {
        this.auditoriaclientes.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    console.log(this.auditoriaclientes);
    })

    this._auditoriaIVAService.getAuditoriaIVA().subscribe(data => {
      this.auditoriaiva = [];
      data.forEach((element: any) => {
        this.auditoriaiva.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    console.log(this.auditoriaiva);
    })

    this._empleadoService.getEmpleados().subscribe(data => {
      this.empleadoss = [];
      data.forEach((element: any) => {
        this.empleadoss.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    console.log(this.empleadoss);
    })

    this._situacionIVA.getSituacionesIVA().subscribe(data => {
      this.situacioniva = [];
      data.forEach((element: any) => {
        this.situacioniva.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    console.log(this.situacioniva);
    })

    this._usuarios.getUsuarios().subscribe(data => {
      this.usuarios = [];
      data.forEach((element: any) => {
        this.usuarios.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.usuarios);
    })
  }

  generarBackup2(){
    


  }
  generarBackup(){
    
      const { parse } = require('json2csv');
      

      try {
        const csv = parse(this.auditoriaclientes);
        this.filesaver.save(csv, `auditoriaclientes-${this._empresaService.getNombre()}.csv`);
      } catch (err) {
        console.error(err);
      }
    

      try {
        const csv = parse(this.auditoriaiva);
        this.filesaver.save(csv, `auditoriaiva-${this._empresaService.getNombre()}.csv`);
      } catch (err) {
        console.error(err);
      }

      try {
        const csv = parse(this.empleadoss);
        this.filesaver.save(csv, `empleados-${this._empresaService.getNombre()}.csv`);
      } catch (err) {
        console.error(err);
      }

      try {
        const csv = parse(this.situacioniva);
        this.filesaver.save(csv, `situacionIVA-${this._empresaService.getNombre()}.csv`);
      } catch (err) {
        console.error(err);
      }

      try {
        const csv = parse(this.usuarios);
        console.log(this.usuarios);
        this.filesaver.save(csv, `usuarios-${this._empresaService.getNombre()}.csv`);
      } catch (err) {
        console.error(err);
      }
    //this.jsontocsv.downloadFile(this.jsonData, 'backup' + Date().toString());
  }

  getJSONfromCSV(file: File) {
    let reader = new FileReader();
    reader.readAsText(file);

    reader.onload = (e) => {
      let array: string[] = (reader.result as string).split('\n');
      let headers = array[0].split(", ")[0].split(",").map(e => e.replace(/\"/g, '', ));
      let result = [];
      
      for (let i = 1; i < array.length - 1; i++) {
        let obj: any = {}
        let str = array[i].replace(/\"/g, '').split(",");
        for (let i = 0; i < str.length; i++) {
          obj[headers[i]] = str[i];
        }
        let fechaActualizacion = {
          seconds: obj["fechaActualizacion.seconds"],
          nanoseconds: obj["fechaActualizacion.nanoseconds"]
        }
        let fechaCreacion = {
          seconds: obj["fechaCreacion.seconds"],
          nanoseconds: obj["fechaCreacion.nanoseconds"]
        }
        delete obj["fechaActualizacion.seconds"];
        delete obj["fechaActualizacion.nanoseconds"];
        delete obj["fechaCreacion.seconds"];
        delete obj["fechaCreacion.nanoseconds"];

        obj = {...obj, fechaActualizacion, fechaCreacion}
        result.push(obj);
      }
      console.log(result)
    }
  }

  borrarEmpresa(){
    this._empleadoService.borrarTablas();

   // const sub = this.firestore.collection('empresas' + this._empresaService.getNombre() , ref => ref.where('nombre', '==', this._empresaService.getNombre())).valueChanges().subscribe((user: any) => {
   

    //this._empresaService.eliminarEmpresa(this._empresaService.getNombre());
    this.router.navigate(['']);
    
  }

  restaurarEmpresa(){
    this._empleadoService.borrarTablas();

  }
}
