import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuditoriaIVAService } from 'src/app/services/auditoria-iva.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ExcelService } from 'src/app/services/excel.service';
import * as XLSX from 'xlsx'; 

@Component({
  selector: 'app-auditoria-iva',
  templateUrl: './auditoria-iva.component.html',
  styleUrls: ['./auditoria-iva.component.css']
})
export class AuditoriaIvaComponent implements OnInit {

  auditoriaIVA: any[] = [];
  fileName= 'AuditoriaIVA.xlsx';

  constructor(private _auditoriaIVAService: AuditoriaIVAService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getAuditoriaIVA()
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

  getAuditoriaIVA() {
    this._auditoriaIVAService.getAuditoriaIVA().subscribe(data => {
      this.auditoriaIVA = [];
      data.forEach((element: any) => {
        this.auditoriaIVA.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.auditoriaIVA);
    });
  }




}