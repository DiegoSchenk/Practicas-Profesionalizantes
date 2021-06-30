import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaEmpleadosService {

  constructor(private firestore: AngularFirestore) { }

  agregarAuditoriaEmpleados(auditoriaEmpleados: any): Promise<any> {
    
    return this.firestore.collection('auditoriaEmpleados').add(auditoriaEmpleados);
  }

  getAuditoriaEmpleados(): Observable<any> {
    return this.firestore.collection('auditoriaEmpleados', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }

  actualizarAuditoriaEmpleados(id: string, data:any): Promise<any> {
    return this.firestore.collection('auditoriaEmpleados').doc(id).update(data);
  }

  
}