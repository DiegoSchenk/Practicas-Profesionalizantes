import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { EmpresaService } from './empresa.service';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaIVAService {

  constructor(private firestore: AngularFirestore,private empresa:EmpresaService) { }

  agregarAuditoriaIVA(auditoriaIVA: any): Promise<any> {
    return this.firestore.collection('auditoriaIVA'  + this.empresa.getNombre() ).add(auditoriaIVA);
  }

  getAuditoriaIVA(): Observable<any> {
    return this.firestore.collection('auditoriaIVA'  + this.empresa.getNombre() , ref => ref.orderBy('numoprA', 'desc')).snapshotChanges();
  }

  actualizarAuditoriaIVAs(id: string, data:any): Promise<any> {
    return this.firestore.collection('auditoriaIVA'  + this.empresa.getNombre() ).doc(id).update(data);
  }

  getNumopr(): Observable<unknown[]> {
    var numero:number;
    numero = 0;
    return this.firestore.collection('auditoriaIVA'  + this.empresa.getNombre() , ref => ref.orderBy('numoprA', 'desc').limit(1)).valueChanges();
  }
}
