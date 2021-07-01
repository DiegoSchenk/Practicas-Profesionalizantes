import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuditoriaClientesService } from 'src/app/services/auditoria-clientes.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { RolService } from 'src/app/services/rol.service';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

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
  
    
    const auditoriacliente: any = {
      numoprA: 'Nombre',
      tipooprA: 'Alta',
      usuarioA: this.rol.getUsuario(),
      terminalA: this.ipAddress,
      fechahoraA: new Date().toDateString()+ ' ' +new Date().getHours()+ ':' +new Date().getMinutes()+ ':' +new Date().getSeconds(), 
      dniA: this.createEmpleado.value.dni,
      descA: 'Se ha creado el registro: ' + this.createEmpleado.value.dni + '.',
    }

    this.loading = true;
    this._auditoriaService.agregarAuditoriaClientes(auditoriacliente);
    this._empleadoService.agregarEmpleado(empleado).then(() => {
      this.toastr.success('El cliente fue registrado con exito!', 'Cliente Registrado', {
        positionClass: 'toast-bottom-right'
      });
      this.loading = false;
      this.router.navigate(['/list-empleados']);
    }).catch(error => {
      console.log(error);
      this.loading = false;
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
      this.loading = false;
      this.toastr.info('El cliente fue modificado con exito', 'Cliente modificado', {
        positionClass: 'toast-bottom-right'
      })
      this.router.navigate(['/list-empleados']);
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
