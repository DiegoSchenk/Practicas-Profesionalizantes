import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RolService } from 'src/app/services/rol.service';
import { HttpClient } from '@angular/common/http';
import { SituacionesIVAService } from 'src/app/services/situacion-iva.service';
import { AuditoriaIVAService } from 'src/app/services/auditoria-iva.service';
import { IvyParser } from '@angular/compiler';
import { Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-create-iva',
  templateUrl: './create-iva.component.html',
  styleUrls: ['./create-iva.component.css']
})
export class CreateIvaComponent implements OnInit {
  
  createSituacionIVA: FormGroup;
  createAuditoria: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = 'Agregar Situacion de IVA';
  ipAddress:any

  constructor(private fb: FormBuilder,
    private _situacionIVAService: SituacionesIVAService,
    private _auditoriaService: AuditoriaIVAService,
    private router: Router,
    private toastr: ToastrService,
    private rol:RolService,
    private firestore: AngularFirestore,
    private _empresaService:EmpresaService,
    private http: HttpClient,
    private aRoute: ActivatedRoute) {
    this.createSituacionIVA = this.fb.group({
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required]
    })
    this.createAuditoria = this.fb.group({
      numoprA: ['', Validators.required],
      tipooprA: ['', Validators.required],
      usuarioA: ['', Validators.required],
      terminalA : ['', Validators.required],
      fechahoraA : ['', Validators.required],
      codigoA: ['', Validators.required],
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

  agregarEditarSituacionIVA() {
    this.submitted = true;
    if( this.rol.getRol() != 4){
    if (this.createSituacionIVA.invalid) {
      return;
    }

    if (this.id === null) {
      this.agregarSituacionIVA();
    } else {
      this.editarSituacionIVA(this.id);
    }
  } else {alert('No tienes los privilegios para ejecutar esta Acción.')}
  }

  agregarSituacionIVA() {
    const situacionIVA: any = {
      codigo: this.createSituacionIVA.value.codigo,
      descripcion: this.createSituacionIVA.value.descripcion,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    this.loading = true;
    
    const sub = this.firestore.collection('situacion-iva' + this._empresaService.getNombre() , ref => ref.where('codigo', '==', this.createSituacionIVA.value.codigo)).valueChanges().subscribe((user: any) => {
      if (user.length == 0) {
        this._situacionIVAService.agregarSituacionIVA(situacionIVA).then(() => {
          this.toastr.success('La situacion de IVA fue registrada con exito!', 'Situacion de IVA Registrada', {
            positionClass: 'toast-bottom-right'
          });
          const audit_subs = this._auditoriaService.getNumopr().subscribe((num:any) =>{
              const auditoriaIVA: any = {
                numoprA: num.length > 0 ? num[0]['numoprA'] + 1 : 1,
                tipooprA: 'Alta',
                usuarioA: this.rol.getUsuario(),
                terminalA: this.ipAddress,
                fechahoraA: new Date().toDateString()+ ' ' +new Date().getHours()+ ':' +new Date().getMinutes()+ ':' +new Date().getSeconds(),
                codigoA: this.createSituacionIVA.value.codigo,
                descA: 'Se ha creado el registro.',
              }
              this._auditoriaService.agregarAuditoriaIVA(auditoriaIVA);
              this.loading = false;
              audit_subs.unsubscribe();
              this.router.navigate(['/situacioniva']);
            })    
        }).catch(error => {
          console.log(error);
          this.loading = false;
        })
      
      } else {
        this.toastr.warning('El codigo ingresado ya existe', 'Error', {
          positionClass: 'toast-bottom-right'
        });
        this.loading = false;
      }
      sub.unsubscribe();  
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
      const audit_subs = this._auditoriaService.getNumopr().subscribe((num:any) =>{
        const auditoriaIVA: any = {
          numoprA: num.length > 0 ? num[0]['numoprA'] + 1 : 1,
          tipooprA: 'Modificacion',
          usuarioA: this.rol.getUsuario(),
          terminalA: this.ipAddress,
          fechahoraA: new Date().toDateString()+ ' ' +new Date().getHours()+ ':' +new Date().getMinutes()+ ':' +new Date().getSeconds(),
          codigoA: this.createSituacionIVA.value.codigo,
          descA: 'Se ha modificado el registro: ' + this.createSituacionIVA.value.codigo +'.'
        }
        this._auditoriaService.agregarAuditoriaIVA(auditoriaIVA);
        this.loading = false;
        audit_subs.unsubscribe();
        
        this.router.navigate(['/situacioniva']);
      })
      this.toastr.info('La situacion de IVA fue modificada con exito', 'Situacion de IVA modificada', {
        positionClass: 'toast-bottom-right'
      })
    })
  }


  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Situacion de IVA'
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

