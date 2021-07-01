import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuditoriaClientesService } from 'src/app/services/auditoria-clientes.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ExcelService } from 'src/app/services/excel.service';
import * as XLSX from 'xlsx'; 

@Component({
  selector: 'app-auditoria',
  templateUrl: './auditoria.component.html',
  styleUrls: ['./auditoria.component.css']
})
export class AuditoriaComponent implements OnInit {

  auditoriaclientes: any[] = [];
  fileName= 'AuditoriaClientes.xlsx';

  constructor(private _auditoriaClientesService: AuditoriaClientesService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getAuditoriaClientes()
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

  getAuditoriaClientes() {
    this._auditoriaClientesService.getAuditoriaClientes().subscribe(data => {
      this.auditoriaclientes = [];
      data.forEach((element: any) => {
        this.auditoriaclientes.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.auditoriaclientes);
    });
  }




}
