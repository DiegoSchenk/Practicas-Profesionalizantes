import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuditoriaIVAService } from 'src/app/services/auditoria-iva.service';
import { RolService } from 'src/app/services/rol.service';
import { SituacionesIVAService } from 'src/app/services/situacion-iva.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  @Input() showBotones!: boolean;
  @Output() loaded: EventEmitter<Boolean> = new EventEmitter();
  situacionesIVA: any[] = [];
  createSituacionIVA: FormGroup;
  ipAddress:any;

  constructor(private _situacionIVAService: SituacionesIVAService,
              private rol: RolService,
              private fb: FormBuilder,
              private _auditoriaService: AuditoriaIVAService,
              private http:HttpClient,
              private toastr: ToastrService) {
    this.http.get<{ip:string}>('https://jsonip.com').subscribe( data => {
      this.ipAddress = data.ip
    });
    this.createSituacionIVA = this.fb.group({
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getSituacionesIVA();
  }

  getSituacionesIVA() {
    this._situacionIVAService.getSituacionesIVA().subscribe(data => {
      this.situacionesIVA = [];
      data.forEach((element: any) => {
        this.situacionesIVA.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      this.loaded.emit(true);
    });
  }

  eliminarSituacionIVA(id: string) {
    if( this.rol.getRol() != 4){
      this._situacionIVAService.getSituacionIVA(id).subscribe(data => {
        this.createSituacionIVA.setValue({
          codigo: data.payload.data()['codigo'],
          descripcion: data.payload.data()['descripcion']
        });
      });
      this._situacionIVAService.eliminarSituacionIVA(id).then(() => {
        const audit_subs = this._auditoriaService.getNumopr().subscribe((num:any) => {
          const auditoriaIVA: any = {
            numoprA: num.length > 0 ? num[0]['numoprA'] + 1 : 1,
            tipooprA: 'Baja',
            usuarioA: this.rol.getUsuario(),
            terminalA: this.ipAddress,
            fechahoraA: new Date().toDateString()+ ' ' +new Date().getHours()+ ':' +new Date().getMinutes()+ ':' +new Date().getSeconds(),
            codigoA: this.createSituacionIVA.value.codigo,
            descA: 'Se ha eliminado el registro.',
          };
          this._auditoriaService.agregarAuditoriaIVA(auditoriaIVA);
          audit_subs.unsubscribe();
          this.toastr.error('La situacion de IVA fue eliminada con exito', 'Registro eliminado!', {
            positionClass: 'toast-bottom-right'
          });
        });
      }).catch(error => {
        console.log(error);
      });      
    } else {
      alert('No tienes los privilegios para ejecutar esta Acción.')
    }
  }
}
