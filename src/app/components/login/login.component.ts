import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //logo = 'http://assets.stickpng.com/images/5847ea22cef1014c0b5e4833.png'
  
  constructor(private router: Router, private firestore: AngularFirestore, private rolservice:RolService) { }

  ngOnInit(): void {
  }

  
  ingresar(username: string, contrasena: string) { 
    
    this.firestore.collection('usuarios', ref => ref.where('usuario', '==', username)).valueChanges().subscribe((user: any) => {
      if (user.length > 0 && user[0]['contrasena'] === contrasena) {
      this.rolservice.setUser(user[0])
      var rol = user[0]['codigo'];
       if (rol === 3) {
        this.router.navigateByUrl('/auditoria');
       } else { if (rol === 4) {this.router.navigateByUrl('/list-empleados');}
          else {this.router.navigateByUrl('/list-empleados');}
      }
  
      } else {
          alert('Las credenciales de ingreso fueron incorrectas, vuelva a ingresarlas nuevamente.')
      }
    })
  }
    

}