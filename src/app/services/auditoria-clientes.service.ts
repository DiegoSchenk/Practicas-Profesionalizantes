import { analyzeAndValidateNgModules } from '@angular/compiler';
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
    return this.firestore.collection('auditoriaclientes', ref => ref.orderBy('fechahoraA', 'desc')).snapshotChanges();
  }

  actualizarAuditoriaClientes(id: string, data:any): Promise<any> {
    return this.firestore.collection('auditoriaclientes').doc(id).update(data);
  }

  //getMax(){
    // this.firestore.collection('usuarios', ref => ref.where('usuario', '==', username)).valueChanges().subscribe((user: any) => {
    //return this.firestore.collection('auditoriaclientes', ref => ref.orderBy('numoprA', 'desc').limitToLast(1).subscribe((user: any) => {
    //}
  //}
  getNumopr(): Observable<unknown[]> {
    var numero:number;
    numero = 0;
    return this.firestore.collection('auditoriaclientes', ref => ref.orderBy('numoprA', 'desc').limit(1)).valueChanges();
  }
  
}