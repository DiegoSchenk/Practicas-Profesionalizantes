import { Component, Input, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service'; 

@Component({
  selector: 'app-mi-componente',
  templateUrl: './mi-componente.component.html',
  styleUrls: ['./mi-componente.component.css']
})
export class MiComponenteComponent implements OnInit {

  @Input() titulo!:string;

  constructor(private dbservice: DatabaseService) {

   }

  ngOnInit(): void {
  }

  onclick():void{
    alert("Llamada de boton")
  }
}
