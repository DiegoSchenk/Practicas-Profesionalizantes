import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RolService } from '../services/rol.service';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private rol:RolService){}
  
  
  userLinks= [
    [ ], //0
    ['', 'login', 'list-empleados','create-empleado','editEmpleado/:id','editSituacionIVA/:id','editUsuario/:id','situacioniva','usuarios','create-usuarios','create-iva', 'restaurar-backup', 'contaduria', 'asientos','balance-general','librodiario', 'mayordiario'],//  1: Supervisor.
    ['', 'login', 'list-empleados','create-empleado','editEmpleado/:id','editSituacionIVA/:id','situacioniva','create-iva', 'restaurar-backup', 'contaduria', 'asientos','balance-general','librodiario', 'mayordiario'],//   2: Cliente.
    ['', 'login','auditoria', 'auditoria-iva',],//   3: Auditor.
    ['', 'login','list-empleados','situacioniva']//    4: Usuario. 
  ]

  canActivate(
    route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var rol = this.rol.getRol()
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
