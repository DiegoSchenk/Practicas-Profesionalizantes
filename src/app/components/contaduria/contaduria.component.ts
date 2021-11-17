import { Component, OnInit } from '@angular/core';
import { AuthGuard } from 'src/app/guards/auth.guard';

@Component({
  selector: 'app-contaduria',
  templateUrl: './contaduria.component.html',
  styleUrls: ['./contaduria.component.css']
})
export class ContaduriaComponent implements OnInit {

  constructor(public guard:AuthGuard) { }

  ngOnInit(): void {
  }

}
