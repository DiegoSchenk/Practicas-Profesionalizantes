import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaClientesService {

  constructor(private firestore: AngularFirestore) { }

  agregarAuditoriaClientes(auditoriacliente: any): Promise<any> {         
    return this.firestore.collection('auditoriaclientes').add(auditoriacliente);
  }

  getAuditoriaClientes(): Observable<any> {
    return this.firestore.collection('auditoriaclientes', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }

  actualizarAuditoriaClientes(id: string, data:any): Promise<any> {
    return this.firestore.collection('auditoriaclientes').doc(id).update(data);
  }

}