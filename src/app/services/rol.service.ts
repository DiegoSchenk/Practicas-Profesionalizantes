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

  getRol(){
    return this.user['codigo']
  }

}
