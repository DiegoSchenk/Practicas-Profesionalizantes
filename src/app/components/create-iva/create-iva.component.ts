import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SituacionesIVAService } from 'src/app/services/situacion-iva.service';

@Component({
  selector: 'app-create-iva',
  templateUrl: './create-iva.component.html',
  styleUrls: ['./create-iva.component.css']
})
export class CreateIvaComponent implements OnInit {
  
  createSituacionIVA: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = 'Agregar Situacion de IVA';

  constructor(private fb: FormBuilder,
    private _situacionIVAService: SituacionesIVAService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute) {
    this.createSituacionIVA = this.fb.group({
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarEditarSituacionIVA() {
    this.submitted = true;

    if (this.createSituacionIVA.invalid) {
      return;
    }

    if (this.id === null) {
      this.agregarSituacionIVA();
    } else {
      this.editarSituacionIVA(this.id);
    }

  }

  agregarSituacionIVA() {
    const situacionIVA: any = {
      codigo: this.createSituacionIVA.value.codigo,
      descripcion: this.createSituacionIVA.value.descripcion,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    this.loading = true;
    this._situacionIVAService.agregarSituacionIVA(situacionIVA).then(() => {
      this.toastr.success('La situacion de IVA fue registrada con exito!', 'Situacion de IVA Registrada', {
        positionClass: 'toast-bottom-right'
      });
      this.loading = false;
      this.router.navigate(['/situacion-iva']);
    }).catch(error => {
      console.log(error);
      this.loading = false;
    })
  }

  editarSituacionIVA(id: string) {

    const situacionIVA: any = {
      codigo: this.createSituacionIVA.value.codigo,
      descripcion: this.createSituacionIVA.value.descripcion,     
      fechaActualizacion: new Date()
    }

    this.loading = true;

    this._situacionIVAService.actualizarSituacionIVA(id, situacionIVA).then(() => {
      this.loading = false;
      this.toastr.info('La situacion de IVA fue modificada con exito', 'Situacion de IVA modificada', {
        positionClass: 'toast-bottom-right'
      })
      this.router.navigate(['/situacion-iva']);
    })
  }


  esEditar() {
    this.titulo = 'Editar Situacion de IVA'
    if (this.id !== null) {
      this.loading = true;
      this._situacionIVAService.getSituacionIVA(this.id).subscribe(data => {
        this.loading = false;
        this.createSituacionIVA.setValue({
          codigo: data.payload.data()['codigo'],
          descripcion: data.payload.data()['descripcion']
        })
      })
    }
  }

}

