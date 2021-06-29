import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logo = 'http://assets.stickpng.com/images/5847ea22cef1014c0b5e4833.png'
  
  constructor(private router: Router, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  
  ingresar(username: string, contrasena: string) { 
    
    this.firestore.collection('usuarios', ref => ref.where('usuario', '==', username)).valueChanges().subscribe((user: any) => {
      console.log(user)
      if (user.length > 0 && user[0]['contrasena'] === contrasena) {
        
       this.router.navigateByUrl('/list-empleados');
      } else {
          alert('Las credenciales de ingreso fueron incorrectas, vuelva a ingresarlas nuevamente.')
      }
    })
  }
    

}