import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mi-componente',
  templateUrl: './mi-componente.component.html',
  styleUrls: ['./mi-componente.component.css']
})
export class MiComponenteComponent implements OnInit {

  @Input() titulo!:string;

  constructor() { }

  ngOnInit(): void {
  }

  onclick():void{
    alert("Llamada de boton")
  }
}
