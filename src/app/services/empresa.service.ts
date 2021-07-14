import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class empresa {

  empresa: any
  constructor() {}

  setEmpresa(usuario:any){
    this.empresa = usuario;
  }

  getNombre():number{
    return this.empresa['nombre']
  }

  getDescripcion():number{
    return this.empresa['descripción']
  }
}
