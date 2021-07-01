import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { AuditoriaClientesService } from 'src/app/services/auditoria-clientes.service';
import { RolService } from 'src/app/services/rol.service';
import * as printJS from 'print-js';
import { NgxPrintModule } from 'ngx-print';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcelService } from 'src/app/services/excel.service';
import * as XLSX from 'xlsx'; 

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {
  empleados: any[] = [];
  createEmpleado: FormGroup;
  fileName= 'Clientes.xlsx';

  constructor(private fb: FormBuilder,
              private _empleadoService: EmpleadoService,
              private excelService: ExcelService,
              private toastr: ToastrService, 
              private _auditoriaService: AuditoriaClientesService,
              private rol: RolService) {
              this.createEmpleado = this.fb.group({
                nombre: ['', Validators.required],
                apellido: ['', Validators.required],
                dni: ['', Validators.required],
                direccion: ['', Validators.required],
                celular: ['', Validators.required],
                ciudad: ['', Validators.required],
                iva:['', Validators.required]
              })
  }

  ngOnInit(): void {
    this.getEmpleados()
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
      console.log(this.empleados);
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
      const auditoriacliente: any = {
        numoprA: 'Nombre',
        tipooprA: 'Baja',
        usuarioA: this.rol.getUsuario(),
        terminalA: 'this.ipAddress,',
        fechahoraA: new Date().toDateString()+ ' ' +new Date().getHours()+ ':' +new Date().getMinutes()+ ':' +new Date().getSeconds(), 
        dniA: this.createEmpleado.value.dni,
        descA: 'Se ha eliminado el registro: ' + this.createEmpleado.value.dni + '.',
      }
      this._auditoriaService.agregarAuditoriaClientes(auditoriacliente);
      
      this.toastr.error('El cliente fue eliminado con exito', 'Registro eliminado!', {
        positionClass: 'toast-bottom-right'
      });
    }).catch(error => {
      console.log(error);
    })
    } else {alert('No tienes los privilegios para ejecutar esta Acción.')}

  }




}
