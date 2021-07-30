import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RolService } from 'src/app/services/rol.service';
import { HttpClient } from '@angular/common/http';
import { EmpresaService } from 'src/app/services/empresa.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AuditoriaIVAService } from 'src/app/services/auditoria-iva.service';
import { IvyParser } from '@angular/compiler';
import { Input } from '@angular/core';


@Component({
  selector: 'app-create-empresa',
  templateUrl: './create-empresa.component.html',
  styleUrls: ['./create-empresa.component.css']
})
export class CreateEmpresaComponent implements OnInit {
  createEmpresa: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = 'Agregar Empresa';

  
  constructor(private fb: FormBuilder,
    private _empresaService: EmpresaService,
    private _usuarios:UsuariosService,
    private router: Router,
    private toastr: ToastrService,
    private rol:RolService,
    private aRoute: ActivatedRoute) {
    this.createEmpresa = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    })


    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)


  }


  ngOnInit(): void {
    this.esEditar();
  }

  agregarEditarEmpresa() {
    this.submitted = true;

    if (this.createEmpresa.invalid) {
      return;
    }
    if (this.id === null) {
      this.agregarEmpresa();
    } else {
      this.editarEmpresa(this.id);
    }
  }

  crearEmpresa(empresa:string, desc:string){
    
  
    const usuarionuevo: any = {
      codigo: 1,
      usuario: 'Supervisor',
      contrasena: '1',
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    const empresanueva: any = {
      nombre: empresa,
      descripcion: desc 
    }
    this._empresaService.setEmpresa(empresanueva);
    this._usuarios.agregarUsuario(usuarionuevo);
    alert('Para poder entrar al sistema utilice las siguientes credenciales. Usuario: Supervisor, Contraseña: 1');
  }


  agregarEmpresa() {
    const empresa: any = {
      nombre: this.createEmpresa.value.nombre,
      descripcion: this.createEmpresa.value.descripcion,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    this.loading = true;
    this._empresaService.agregarEmpresa(empresa).then(() => {
      this.toastr.success('La empresa fue registrada con exito!', 'Empresa Registrada', {
        positionClass: 'toast-bottom-right'
      });
      this.router.navigate(['/login-empresas']);
      this.crearEmpresa(this.createEmpresa.value.nombre, this.createEmpresa.value.descripcion)
    }).catch(error => {
      console.log(error);
      this.loading = false;
    })
  }

  editarEmpresa(id: string) {

    const empresa: any = {
      nombre: this.createEmpresa.value.nombre,
      descripcion: this.createEmpresa.value.descripcion,     
      fechaActualizacion: new Date()
    }

    this.loading = true;

    this._empresaService.actualizarEmpresa(id, empresa).then(() => {
      this.loading = false;
      this.router.navigate(['/login-empresas']);
      this.toastr.info('La Empresa fue modificada con exito', 'Empresa modificada', {
        positionClass: 'toast-bottom-right'
      })
    })
  }


  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Empresa'
      this.loading = true;
      this._empresaService.getEmpresa(this.id).subscribe(data => {
        this.loading = false;
        this.createEmpresa.setValue({
          nombre: data.payload.data()['nombre'],
          descripcion: data.payload.data()['descripcion']
        })
      })
    }
  }
  
}