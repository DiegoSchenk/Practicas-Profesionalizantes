import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuditoriaClientesService } from 'src/app/services/auditoria-clientes.service';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-auditoria',
  templateUrl: './auditoria.component.html',
  styleUrls: ['./auditoria.component.css']
})
export class AuditoriaComponent implements OnInit {

  auditoriaclientes: any[] = [];

  constructor(private _auditoriaClientesService: AuditoriaClientesService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getAuditoriaClientes()
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
