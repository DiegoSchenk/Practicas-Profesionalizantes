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

  borrarTablas() {
    const sub = this.firestore.collection('auditoriaclientes'+ this.empresa.getNombre()).get().subscribe(querySnapshot => {
      querySnapshot.docs.forEach(snapshot => {
        snapshot.ref.delete();
      });
      sub.unsubscribe();
    });

    const sub2 = this.firestore.collection('auditoriaiva'+ this.empresa.getNombre()).get().subscribe(querySnapshot => {
      querySnapshot.docs.forEach(snapshot => {
        snapshot.ref.delete();
      });
      sub2.unsubscribe();
    });

    const sub3 = this.firestore.collection('empleados'+ this.empresa.getNombre()).get().subscribe(querySnapshot => {
      querySnapshot.docs.forEach(snapshot => {
        snapshot.ref.delete();
      });
      sub3.unsubscribe();
    });

    const sub4 = this.firestore.collection('situacionIVA'+ this.empresa.getNombre()).get().subscribe(querySnapshot => {
      querySnapshot.docs.forEach(snapshot => {
        snapshot.ref.delete();
      });
      sub4.unsubscribe();
    });

    const sub5 = this.firestore.collection('usuarios'+ this.empresa.getNombre()).get().subscribe(querySnapshot => {
      querySnapshot.docs.forEach(snapshot => {
        snapshot.ref.delete();
      });
      sub5.unsubscribe();
    });
  }
}
