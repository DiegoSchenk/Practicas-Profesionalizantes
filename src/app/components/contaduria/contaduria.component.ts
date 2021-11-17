import { Component, OnInit } from '@angular/core';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contaduria',
  templateUrl: './contaduria.component.html',
  styleUrls: ['./contaduria.component.css']
})
export class ContaduriaComponent implements OnInit {

  constructor(public guard:AuthGuard, private router:Router) { }

  ngOnInit(): void {
  }

  cambiarRouter(num:number){
    if(num == 1) this.router.navigate(['asientos']);
    else if (num == 2) this.router.navigate(['balance-general']);
    else if (num == 3) this.router.navigate(['librodiario']);
    else this.router.navigate(['mayordiario']);
  }
}
