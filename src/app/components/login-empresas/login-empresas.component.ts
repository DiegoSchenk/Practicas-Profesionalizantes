import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { RolService } from 'src/app/services/rol.service';
import { EmpresaService } from 'src/app/services/empresa.service';



@Component({
  selector: 'app-login-empresas',
  templateUrl: './login-empresas.component.html',
  styleUrls: ['./login-empresas.component.css']
})
export class LoginEmpresasComponent implements OnInit {
  empresas: any[] = [];
  fileName= 'SituacionesDeIVA.xlsx';
  createEmpresa: FormGroup;

  constructor(private fb: FormBuilder,
    private _empresasService: EmpresaService,
    private toastr: ToastrService, private rol:RolService) {
      this.createEmpresa = this.fb.group({
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required]
      })
    }


  ngOnInit(): void {
    this.getEmpresas()
  }

  getEmpresas() {
    this._empresasService.getEmpresas().subscribe(data => {
      this.empresas = [];
      data.forEach((element: any) => {
        this.empresas.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    });
  }

  setEmpresa(id:number){
    this._empresasService.setEmpresa(this.empresas[id])
  }

}
