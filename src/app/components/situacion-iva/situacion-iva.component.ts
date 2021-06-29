import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { RolService } from 'src/app/services/rol.service';
import { SituacionesIVAService } from 'src/app/services/situacion-iva.service';


@Component({
  selector: 'app-situacion-iva',
  templateUrl: './situacion-iva.component.html',
  styleUrls: ['./situacion-iva.component.css']
})
export class SituacionIVAComponent implements OnInit {
  situacionesIVA: any[] = [];

  constructor(private _situacionesIVAService: SituacionesIVAService,
              private toastr: ToastrService, private rol:RolService) {
  }

  ngOnInit(): void {
    this.getSituacionesIVA()
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
