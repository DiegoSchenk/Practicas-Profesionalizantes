import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaClientesService {

  constructor(private firestore: AngularFirestore) { }

  agregarAuditoriaClientes(auditoriaClientes: any): Promise<any> {         
    return this.firestore.collection('auditoriaClientes').add(auditoriaClientes);
  }

  getAuditoriaClientes(): Observable<any> {
    return this.firestore.collection('auditoriaClientes', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }

  actualizarAuditoriaClientes(id: string, data:any): Promise<any> {
    return this.firestore.collection('auditoriaClientes').doc(id).update(data);
  }

}