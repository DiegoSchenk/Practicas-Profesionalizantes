import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logo = 'http://assets.stickpng.com/images/5847ea22cef1014c0b5e4833.png'
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  ingresar() {
  /*  
    if (true) {
        console.log('This will always executed.');
    }
    else{

    }
    */
    this.router.navigateByUrl('/list-empleados');
  }

}