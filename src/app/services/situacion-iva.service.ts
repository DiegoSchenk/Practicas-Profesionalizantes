import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SituacionesIVAService {

  constructor(private firestore: AngularFirestore) { }

  agregarSituacionIVA(empleado: any): Promise<any> {
    return this.firestore.collection('situaciones-iva').add(empleado);
  }

  getSituacionesIVA(): Observable<any> {
    return this.firestore.collection('situaciones-iva', ref => ref.orderBy('codigo', 'asc')).snapshotChanges();
  }

  eliminarSituacionIVA(id: string): Promise<any> {
    return this.firestore.collection('situaciones-iva').doc(id).delete();
  }

  getSituacionIVA(id: string): Observable<any> {
    return this.firestore.collection('situaciones-iva').doc(id).snapshotChanges();
  }

  actualizarSituacionIVA(id: string, data:any): Promise<any> {
    return this.firestore.collection('situaciones-iva').doc(id).update(data);
  }

}