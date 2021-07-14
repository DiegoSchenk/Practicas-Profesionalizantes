import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { RolService } from 'src/app/services/rol.service';
import { EmpresaService } from 'src/app/services/situacion-iva.service';



@Component({
  selector: 'app-login-empresas',
  templateUrl: './login-empresas.component.html',
  styleUrls: ['./login-empresas.component.css']
})
export class LoginEmpresasComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private _empresasService: SituacionesIVAService,
    private toastr: ToastrService, private rol:RolService) {
      this.createSituacionIVA = this.fb.group({
        codigo: ['', Validators.required],
        descripcion: ['', Validators.required]
      })
      this.http.get<{ip:string}>('https://jsonip.com')
    .subscribe( data => {
    console.log('th data', data);
    this.ipAddress = data.ip
    })
}

  ngOnInit(): void {
    this.getSituacionesIVA()
  }

  getSituacionesIVA() {
    this._situacionIVAService.getSituacionesIVA().subscribe(data => {
      this.situacionesIVA = [];
      data.forEach((element: any) => {
        this.situacionesIVA.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.situacionesIVA);
    });
  }

}
