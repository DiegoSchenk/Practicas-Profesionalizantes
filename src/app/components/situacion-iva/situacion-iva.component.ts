import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { RolService } from 'src/app/services/rol.service';
import { SituacionesIVAService } from 'src/app/services/situacion-iva.service';
import * as XLSX from 'xlsx'; 
import { AuditoriaIVAService } from 'src/app/services/auditoria-iva.service';


@Component({
  selector: 'app-situacion-iva',
  templateUrl: './situacion-iva.component.html',
  styleUrls: ['./situacion-iva.component.css']
})
export class SituacionIVAComponent implements OnInit {
  situacionesIVA: any[] = [];
  fileName= 'SituacionesDeIVA.xlsx';
  createSituacionIVA: FormGroup;

  constructor(private fb: FormBuilder,
              private _situacionIVAService: SituacionesIVAService,
              private _auditoriaService: AuditoriaIVAService,
              private toastr: ToastrService, private rol:RolService) {
                this.createSituacionIVA = this.fb.group({
                  codigo: ['', Validators.required],
                  descripcion: ['', Validators.required]
                })
  }

  ngOnInit(): void {
    this.getSituacionesIVA()
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

  getSituacionesIVA() {
    this._situacionIVAService.getSituacionesIVA().subscribe(data => {
      this.situacionesIVA = [];
      data.forEach((element: any) => {
        this.situacionesIVA.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.situacionesIVA);
    });
  }

  eliminarSituacionIVA(id: string) {
    if( this.rol.getRol() != 4){
      
      this._situacionIVAService.getSituacionIVA(id).subscribe(data => {
        this.createSituacionIVA.setValue({
          codigo: data.payload.data()['codigo'],
          descripcion: data.payload.data()['descripcion']
        })
      })
    this._situacionIVAService.eliminarSituacionIVA(id).then(() => {
      const auditoriaIVA: any = {
        numoprA: 'Nombre',
        tipooprA: 'Baja',
        usuarioA: this.rol.getUsuario(),
        terminalA: 'this.ipAddress',
        fechahoraA: new Date().toDateString()+ ' ' +new Date().getHours()+ ':' +new Date().getMinutes()+ ':' +new Date().getSeconds(),
        codigoA: this.createSituacionIVA.value.codigo,
        descA: 'Se ha eliminado el registro.',
      }
      this._auditoriaService.agregarAuditoriaIVA(auditoriaIVA);
      this.toastr.error('La situacion de IVA fue eliminada con exito', 'Registro eliminado!', {
        positionClass: 'toast-bottom-right'
      });
    }).catch(error => {
      console.log(error);
    })
  } else {alert('No tienes los privilegios para ejecutar esta Acción.')}
  }




}
