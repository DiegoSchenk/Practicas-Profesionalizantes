import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RolService } from '../services/rol.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private rol:RolService){}

  userLinks= [
    [ ], //0
    ['', 'login', 'list-empleados','create-empleado','editEmpleado/:id','editSituacionIVA/:id','editUsuario/:id','situacioniva','auditoria','usuarios','create-usuarios','create-iva'],//  1: Supervisor.
    ['', 'login', 'list-empleados','create-empleado','editEmpleado/:id','editSituacionIVA/:id','situacioniva','create-iva'],//   2: Cliente.
    ['', 'login','auditoria'],//   3: Auditor.
    ['', 'login','editUsuario/:id','usuarios','create-usuarios',]//    4: Usuario. 
  ]

  canActivate(
    route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var rol = this.rol.getRol()
      console.log(route.url.join(''))
      if(this.userLinks[rol].includes(route.url.join(''))){
        return true;
    }
    return false;
  
    
  }

  canActivateLink(url:string){
    var rol = this.rol.getRol()
   
    if(this.userLinks[rol].includes(url)){
      console.log("wawif")
      return true;
       
  }
  return false; 
  }
  
  

}
