import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { EmpresaService } from './empresa.service';


@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  constructor(private firestore: AngularFirestore, private empresa:EmpresaService) { }

  agregarEmpleado(empleado: any): Promise<any> {
    return this.firestore.collection('empleados'+ this.empresa.getNombre() ).add(empleado);
  }

  getEmpleados(): Observable<any> {
    return this.firestore.collection('empleados' + this.empresa.getNombre() , ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }

  eliminarEmpleado(id: string): Promise<any> {
    return this.firestore.collection('empleados' + this.empresa.getNombre()).doc(id).delete();
  }

  getEmpleado(id: string): Observable<any> {
    return this.firestore.collection('empleados' + this.empresa.getNombre()).doc(id).snapshotChanges();
  }

  actualizarEmpleado(id: string, data:any): Promise<any> {
    return this.firestore.collection('empleados' + this.empresa.getNombre()).doc(id).update(data);
  }

}
