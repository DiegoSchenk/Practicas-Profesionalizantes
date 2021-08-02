import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuditoriaClientesService } from 'src/app/services/auditoria-clientes.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { RolService } from 'src/app/services/rol.service';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css']
})
export class CreateEmpleadoComponent implements OnInit {
  createEmpleado: FormGroup;
  createAuditoria: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = 'Agregar Cliente';
  ipAddress:any

  constructor(private fb: FormBuilder,
    private _empleadoService: EmpleadoService,
    private _auditoriaService: AuditoriaClientesService,
    private firestore: AngularFirestore,
    private _empresaService:EmpresaService,
    private router: Router,
    private toastr: ToastrService,
    private rol:RolService,
    private http: HttpClient,
    private aRoute: ActivatedRoute) {
    this.createEmpleado = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      direccion: ['', Validators.required],
      celular: ['', Validators.required],
      ciudad: ['', Validators.required],
      iva:['', Validators.required]
    })
    this.createAuditoria = this.fb.group({
      numoprA: ['', Validators.required],
      tipooprA: ['', Validators.required],
      usuarioA: ['', Validators.required],
      terminalA : ['', Validators.required],
      fechahoraA : ['', Validators.required],
      dniA: ['', Validators.required],
      descA: ['', Validators.required]
    })

    this.http.get<{ip:string}>('https://jsonip.com')
    .subscribe( data => {
      console.log('th data', data);
      this.ipAddress = data.ip
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarEditarEmpleado() {
    if( this.rol.getRol() != 4){  
    this.submitted = true;

    if (this.createEmpleado.invalid) {
      return;
    }

    if (this.id === null) {
      this.agregarEmpleado();
    } else {
      this.editarEmpleado(this.id);
    }
    } else {alert('No tienes los privilegios para ejecutar esta Acción.')}
  }

  agregarEmpleado() {
    const empleado: any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      dni: this.createEmpleado.value.dni,
      direccion: this.createEmpleado.value.direccion,
      celular: this.createEmpleado.value.celular,
      ciudad: this.createEmpleado.value.ciudad,
      iva: this.createEmpleado.value.iva,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
  
    

    this.loading = true;

    const sub = this.firestore.collection('empleados' + this._empresaService.getNombre() , ref => ref.where('dni', '==', this.createEmpleado.value.dni)).valueChanges().subscribe((user: any) => {
      if (user.length == 0) {
        this._empleadoService.agregarEmpleado(empleado).then(() => {
          this.toastr.success('El cliente fue registrado con exito!', 'Cliente Registrado', {
            positionClass: 'toast-bottom-right'
          });
          const audit_subs = this._auditoriaService.getNumopr().subscribe((num:any) =>{
            const auditoriacliente: any = {
              numoprA: num.length > 0 ? num[0]['numoprA'] + 1 : 1,
              tipooprA: 'Alta',
              usuarioA: this.rol.getUsuario(),
              terminalA: this.ipAddress,
              fechahoraA: new Date().toDateString()+ ' ' +new Date().getHours()+ ':' +new Date().getMinutes()+ ':' +new Date().getSeconds(), 
              dniA: this.createEmpleado.value.dni,
              descA: 'Se ha creado el registro: ' + this.createEmpleado.value.dni + '.',
            }
            this._auditoriaService.agregarAuditoriaClientes(auditoriacliente);
            this.loading = false;
            audit_subs.unsubscribe();
            this.router.navigate(['/list-empleados']);
           })
        }).catch(error => {
          console.log(error);
          this.loading = false;
        })
    
      } else {
        this.toastr.warning('El dni ingresado ya existe', 'Error', {
          positionClass: 'toast-bottom-right'
        });
        this.loading = false;
      }
      sub.unsubscribe();  
    })

  }

  editarEmpleado(id: string) {
    const empleado: any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      dni: this.createEmpleado.value.dni,
      direccion: this.createEmpleado.value.direccion,
      celular: this.createEmpleado.value.celular,
      ciudad: this.createEmpleado.value.ciudad,
      iva: this.createEmpleado.value.iva,      
      fechaActualizacion: new Date()
    }

    this.loading = true;

    this._empleadoService.actualizarEmpleado(id, empleado).then(() => {
      const audit_subs = this._auditoriaService.getNumopr().subscribe((num:any) =>{
        const auditoriacliente: any = {
          numoprA: num.length > 0 ? num[0]['numoprA'] + 1 : 1,
          tipooprA: 'Modificacion',
          usuarioA: this.rol.getUsuario(),
          terminalA: this.ipAddress,
          fechahoraA: new Date().toDateString()+ ' ' +new Date().getHours()+ ':' +new Date().getMinutes()+ ':' +new Date().getSeconds(), 
          dniA: this.createEmpleado.value.dni,
          descA: 'Se ha modificado el registro: ' + this.createEmpleado.value.dni + '.',
        }
        this._auditoriaService.agregarAuditoriaClientes(auditoriacliente);
        this.loading = false;
        audit_subs.unsubscribe();
        this.toastr.info('El cliente fue modificado con exito', 'Cliente modificado', {
          positionClass: 'toast-bottom-right'
        })
        this.router.navigate(['/list-empleados']);
      })  
    })
  
  }


  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Cliente'
      this.loading = true;
      this._empleadoService.getEmpleado(this.id).subscribe(data => {
        this.loading = false;
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
    }
  }

}
