import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuditoriaIVAService } from 'src/app/services/auditoria-iva.service';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-auditoria-iva',
  templateUrl: './auditoria-iva.component.html',
  styleUrls: ['./auditoria-iva.component.css']
})
export class AuditoriaIvaComponent implements OnInit {

  auditoriaIVA: any[] = [];

  constructor(private _auditoriaIVAService: AuditoriaIVAService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getAuditoriaIVA()
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