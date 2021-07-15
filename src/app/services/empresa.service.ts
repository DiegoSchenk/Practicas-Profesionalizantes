import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  empresa: any
  constructor(private firestore: AngularFirestore) { }

  setEmpresa(usuario:any){
    this.empresa = usuario;
  }

  getEmpresa(): Observable<any> {
    return this.firestore.collection('empresas', ref => ref.orderBy('nombre', 'asc')).snapshotChanges();
  }

  getNombre():number{
    return this.empresa['nombre']
  }

  getDescripcion():number{
    return this.empresa['descripcion']
  }

  agregarEmpresa(empresa: any): Promise<any> {
    return this.firestore.collection('empresas').add(empresa);
  }
}
