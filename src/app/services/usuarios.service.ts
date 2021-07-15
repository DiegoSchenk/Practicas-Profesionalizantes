import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { EmpresaService } from './empresa.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private firestore: AngularFirestore, private empresa:EmpresaService) { }

  agregarUsuario(usuario: any): Promise<any> {
    return this.firestore.collection('usuarios' + this.empresa.getNombre() ).add(usuario);
  }

  getUsuarios(): Observable<any> {
    return this.firestore.collection('usuarios' + this.empresa.getNombre() , ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }

  eliminarUsuario(id: string): Promise<any> {
    return this.firestore.collection('usuarios' + this.empresa.getNombre() ).doc(id).delete();
  }

  getUsuario(id: string): Observable<any> {
    return this.firestore.collection('usuarios' + this.empresa.getNombre() ).doc(id).snapshotChanges();
  }

  actualizarUsuario(id: string, data:any): Promise<any> {
    return this.firestore.collection('usuarios' + this.empresa.getNombre() ).doc(id).update(data);
  }

}