import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { EmpresaService } from './empresa.service';

@Injectable({
  providedIn: 'root'
})
export class SituacionesIVAService {

  constructor(private firestore: AngularFirestore, private empresa:EmpresaService) { }

  agregarSituacionIVA(empleado: any): Promise<any> {
    return this.firestore.collection('situaciones-iva' + this.empresa.getNombre() ).add(empleado);
  }

  getSituacionesIVA(): Observable<any> {
    return this.firestore.collection('situaciones-iva' + this.empresa.getNombre() , ref => ref.orderBy('codigo', 'asc')).snapshotChanges();
  }

  eliminarSituacionIVA(id: string): Promise<any> {
    return this.firestore.collection('situaciones-iva' + this.empresa.getNombre() ).doc(id).delete();
  }

  getSituacionIVA(id: string): Observable<any> {
    return this.firestore.collection('situaciones-iva' + this.empresa.getNombre() ).doc(id).snapshotChanges();
  }

  actualizarSituacionIVA(id: string, data:any): Promise<any> {
    return this.firestore.collection('situaciones-iva' + this.empresa.getNombre() ).doc(id).update(data);
  }

}