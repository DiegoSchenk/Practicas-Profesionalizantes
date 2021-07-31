import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx'; 

@Component({
  selector: 'app-situacion-iva',
  templateUrl: './situacion-iva.component.html',
  styleUrls: ['./situacion-iva.component.css']
})
export class SituacionIVAComponent implements OnInit {
  fileName= 'SituacionesDeIVA.xlsx';
  loading = true;

  constructor() {}

  ngOnInit(): void {}

  renderFinished() {
    this.loading = false;
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
}
