import { Component, OnInit } from '@angular/core';
import { AuthGuard } from 'src/app/guards/auth.guard';

@Component({
  selector: 'app-restaurar-backup',
  templateUrl: './restaurar-backup.component.html',
  styleUrls: ['./restaurar-backup.component.css']
})
export class RestaurarBackupComponent implements OnInit {

  constructor(public guard:AuthGuard) { }

  ngOnInit(): void {
  }

  restaurar(){
  
  }

  generarbackup(){}
}
