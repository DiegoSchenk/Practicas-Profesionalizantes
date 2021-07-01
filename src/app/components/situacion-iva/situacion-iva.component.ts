import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { RolService } from 'src/app/services/rol.service';
import { SituacionesIVAService } from 'src/app/services/situacion-iva.service';
import * as XLSX from 'xlsx'; 


@Component({
  selector: 'app-situacion-iva',
  templateUrl: './situacion-iva.component.html',
  styleUrls: ['./situacion-iva.component.css']
})
export class SituacionIVAComponent implements OnInit {
  situacionesIVA: any[] = [];
  fileName= 'SituacionesDeIVA.xlsx';

  constructor(private _situacionesIVAService: SituacionesIVAService,
              private toastr: ToastrService, private rol:RolService) {
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
    this._situacionesIVAService.getSituacionesIVA().subscribe(data => {
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
    this._situacionesIVAService.eliminarSituacionIVA(id).then(() => {
      console.log('Situacion de IVA eliminada con exito');
      this.toastr.error('La situacion de IVA fue eliminada con exito', 'Registro eliminado!', {
        positionClass: 'toast-bottom-right'
      });
    }).catch(error => {
      console.log(error);
    })
  } else {alert('No tienes los privilegios para ejecutar esta Acción.')}
  }




}
