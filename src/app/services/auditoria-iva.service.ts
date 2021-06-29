import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaIVAService {

  constructor(private firestore: AngularFirestore) { }

  agregarAuditoriaIVA(auditoriaIVA: any): Promise<any> {
    return this.firestore.collection('auditoriaIVA').add(auditoriaIVA);
  }

  getAuditoriaIVA(): Observable<any> {
    return this.firestore.collection('auditoriaIVA', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }

  actualizarAuditoriaIVAs(id: string, data:any): Promise<any> {
    return this.firestore.collection('auditoriaIVA').doc(id).update(data);
  }

}