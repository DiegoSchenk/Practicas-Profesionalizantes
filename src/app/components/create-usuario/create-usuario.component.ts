import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-create-usuario',
  templateUrl: './create-usuario.component.html',
  styleUrls: ['./create-usuario.component.css']
})
export class CreateUsuarioComponent implements OnInit {
  createUsuario: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = 'Agregar Usuario';

  constructor(private fb: FormBuilder,
    private _usuarioService: UsuariosService,
    private router: Router,
    private firestore: AngularFirestore,
    private _empresaService:EmpresaService,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute) {
    this.createUsuario = this.fb.group({
      codigo: ['', Validators.required],
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarEditarUsuario() {
    this.submitted = true;

    if (this.createUsuario.invalid) {
      return;
    }

    if (this.id === null) {
      this.agregarUsuario();
    } else {
      this.editarUsuario(this.id);
    }

  }

  agregarUsuario() {
    const usuario: any = {
      codigo: this.createUsuario.value.codigo,
      usuario: this.createUsuario.value.usuario,
      contrasena: this.createUsuario.value.contrasena,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    this.loading = true;
    const sub = this.firestore.collection('usuarios' + this._empresaService.getNombre() , ref => ref.where('usuario', '==', this.createUsuario.value.usuario)).valueChanges().subscribe((user: any) => {
      if (user.length == 0) {
        this._usuarioService.agregarUsuario(usuario).then(() => {
          this.toastr.success('El usuario fue registrado con exito!', 'Usuario Registrado', {
            positionClass: 'toast-bottom-right'
          });
          this.loading = false;
          this.router.navigate(['/usuarios']);
        }).catch(error => {
          console.log(error);
          this.loading = false;
        })

      } else {
        this.toastr.warning('El usuario ingresado ya existe', 'Error', {
          positionClass: 'toast-bottom-right'
        });
        this.loading = false;
      }
      sub.unsubscribe();  
    })  

  }

  editarUsuario(id: string) {

    const usuario: any = {
      codigo: this.createUsuario.value.codigo,
      usuario: this.createUsuario.value.usuario,
      contrasena: this.createUsuario.value.contrasena,    
      fechaActualizacion: new Date()
    }

    this.loading = true;

    this._usuarioService.actualizarUsuario(id, usuario).then(() => {
      this.loading = false;
      this.toastr.info('El usuario fue modificado con exito', 'Usuario modificado', {
        positionClass: 'toast-bottom-right'
      })
      this.router.navigate(['/usuarios']);
    })
  }


  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Usuarios'
      this.loading = true;
      this._usuarioService.getUsuario(this.id).subscribe(data => {
        this.loading = false;
        this.createUsuario.setValue({
          codigo: data.payload.data()['codigo'],
          usuario: data.payload.data()['usuario'],
          contrasena: data.payload.data()['contrasena']
        })
      })
    }
  }

}
