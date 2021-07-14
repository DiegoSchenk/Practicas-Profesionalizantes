import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  empresa: any
  constructor() {}

  setEmpresa(usuario:any){
    this.empresa = usuario;
  }

  getNombre():number{
    return this.empresa['nombre']
  }

  getDescripcion():number{
    return this.empresa['descripcion']
  }
}
