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

  agregarEmpresa(empresa: any): Promise<any> {
    return this.firestore.collection('empresas').add(empresa);
  }

  eliminarEmpresa(id: string): Promise<any> {
    return this.firestore.collection('empresas').doc(id).delete();
  }

  getEmpresas(): Observable<any> {
    return this.firestore.collection('empresas', ref => ref.orderBy('nombre', 'asc')).snapshotChanges();
  }

  getEmpresa(id: string): Observable<any> {
    return this.firestore.collection('empresas').doc(id).snapshotChanges();
  }
  
  actualizarEmpresa(id: string, data:any): Promise<any> {
    return this.firestore.collection('empresas').doc(id).update(data);
  }

  getNombre():number{
    return this.empresa['nombre']
  }

  getDescripcion():number{
    return this.empresa['descripcion']
  }

}






