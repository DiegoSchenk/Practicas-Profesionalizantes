import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { EmpresaService } from './empresa.service';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaClientesService {

  constructor(private firestore: AngularFirestore, private empresa:EmpresaService) { }

  agregarAuditoriaClientes(auditoriacliente: any): Promise<any> {         
    return this.firestore.collection('auditoriaclientes' + this.empresa.getNombre() ).add(auditoriacliente);
  }

  getAuditoriaClientes(): Observable<any> {
    return this.firestore.collection('auditoriaclientes' + this.empresa.getNombre() , ref => ref.orderBy('numoprA', 'desc')).snapshotChanges();
  }

  actualizarAuditoriaClientes(id: string, data:any): Promise<any> {
    return this.firestore.collection('auditoriaclientes' + this.empresa.getNombre() ).doc(id).update(data);
  }

  getNumopr(): Observable<unknown[]> {
    var numero:number;
    numero = 0;
    return this.firestore.collection('auditoriaclientes' + this.empresa.getNombre() , ref => ref.orderBy('numoprA', 'desc').limit(1)).valueChanges();
  }
  
}