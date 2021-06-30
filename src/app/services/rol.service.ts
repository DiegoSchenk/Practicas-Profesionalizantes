import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  user: any
  constructor() {}

  setUser(usuario:any){
    this.user = usuario;
  }

  getRol():number{
    return this.user['codigo']
  }

  getUsuario():number{
    return this.user['usuario']
  }
}
