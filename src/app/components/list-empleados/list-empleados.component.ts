import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { RolService } from 'src/app/services/rol.service';
import * as printJS from 'print-js';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {
  empleados: any[] = [];
  empleadosJSON: JSON;

  constructor(private _empleadoService: EmpleadoService,
              private toastr: ToastrService, private rol: RolService) {
  }

  ngOnInit(): void {
    this.getEmpleados()
    //Asi se obtiene el rol
    //console.log(this.rol.getRol())  
  }

  getEmpleados() {
    this._empleadoService.getEmpleados().subscribe(data => {
      this.empleados = [];
      data.forEach((element: any) => {
        this.empleados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.empleados);
    });
  }

  print(){
    printJS({printable: this.empleadosJSON, properties:['dni', 'nombre', 'apellido', 'direccion', 'telefono', 'ciudad', 'iva'], type: 'json'})
  }

  eliminarEmpleado(id: string) {
    this._empleadoService.eliminarEmpleado(id).then(() => {
      console.log('empelado eliminado con exito');
      this.toastr.error('El cliente fue eliminado con exito', 'Registro eliminado!', {
        positionClass: 'toast-bottom-right'
      });
    }).catch(error => {
      console.log(error);
    })
  }




}
