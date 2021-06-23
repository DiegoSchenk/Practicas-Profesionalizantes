import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-create-clientes',
  templateUrl: './create-clientes.component.html',
  styleUrls: ['./create-clientes.component.css']
})
export class CreateClientesComponent implements OnInit {
  createCliente: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = 'Agregar Cliente';

  constructor(private fb: FormBuilder,
    private _clienteService: ClienteService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute) {
    this.createCliente = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      direccion: ['', Validators.required],
      celular: ['', Validators.required],
      ciudad: ['', Validators.required],
      iva:['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarEditarCliente() {
    this.submitted = true;

    if (this.createCliente.invalid) {
      return;
    }

    if (this.id === null) {
      this.agregarCliente();
    } else {
      this.editarCliente(this.id);
    }

  }

  agregarCliente() {
    const cliente: any = {
      nombre: this.createCliente.value.nombre,
      apellido: this.createCliente.value.apellido,
      dni: this.createCliente.value.dni,
      direccion: this.createCliente.value.direccion,
      celular: this.createCliente.value.celular,
      ciudad: this.createCliente.value.ciudad,
      iva: this.createCliente.value.iva,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    this.loading = true;
    this._clienteService.agregarCliente(cliente).then(() => {
      this.toastr.success('El cliente fue registrado con exito!', 'Cliente Registrado', {
        positionClass: 'toast-bottom-right'
      });
      this.loading = false;
      this.router.navigate(['/list-clientes']);
    }).catch(error => {
      console.log(error);
      this.loading = false;
    })
  }

  editarCliente(id: string) {

    const cliente: any = {
      nombre: this.createCliente.value.nombre,
      apellido: this.createCliente.value.apellido,
      dni: this.createCliente.value.dni,
      salario: this.createCliente.value.salario,
      direccion: this.createCliente.value.direccion,
      celular: this.createCliente.value.celular,
      ciudad: this.createCliente.value.ciudad,
      iva: this.createCliente.value.iva,      
      fechaActualizacion: new Date()
    }

    this.loading = true;

    this._clienteService.actualizarCliente(id, cliente).then(() => {
      this.loading = false;
      this.toastr.info('El cliente fue modificado con exito', 'Cliente modificado', {
        positionClass: 'toast-bottom-right'
      })
      this.router.navigate(['/list-clientes']);
    })
  }


  esEditar() {
    this.titulo = 'Editar Cliente'
    if (this.id !== null) {
      this.loading = true;
      this._clienteService.getCliente(this.id).subscribe(data => {
        this.loading = false;
        this.createCliente.setValue({
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
