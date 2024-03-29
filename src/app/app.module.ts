import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Moudulos
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Componente
import { AppComponent } from './app.component';
import { ListEmpleadosComponent } from './components/list-empleados/list-empleados.component';
import { CreateEmpleadoComponent } from './components/create-empleado/create-empleado.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { environment } from 'src/environments/environment';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SituacionIVAComponent } from './components/situacion-iva/situacion-iva.component';
import { AuditoriaComponent } from './components/auditoria/auditoria.component';
import { CreateIvaComponent } from './components/create-iva/create-iva.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CreateUsuarioComponent } from './components/create-usuario/create-usuario.component';
import { LoginComponent } from './components/login/login.component';
import { AuditoriaIvaComponent } from './components/auditoria-iva/auditoria-iva.component';
import { RolService } from './services/rol.service';
import { NgxPrintModule } from 'ngx-print';
import { HttpClientModule } from "@angular/common/http";
import { ExcelService } from './services/excel.service';
import { LoginEmpresasComponent } from './components/login-empresas/login-empresas.component';
import { EmpresaService } from './services/empresa.service';
import { CreateEmpresaComponent } from './components/create-empresa/create-empresa.component';
import { FileSaverModule, FileSaverService } from 'ngx-filesaver';
import { DataTableComponent } from './components/situacion-iva/data-table/data-table.component';
import { RestaurarBackupComponent } from './components/restaurar-backup/restaurar-backup.component';
import { ContaduriaComponent } from './components/contaduria/contaduria.component';
import { LibrodiarioComponent } from './components/librodiario/librodiario.component';
import { MayordiarioComponent } from './components/mayordiario/mayordiario.component';
import { BalanceGeneralComponent } from './components/balance-general/balance-general.component';
import { AsientosComponent } from './components/asientos/asientos.component';



@NgModule({
  declarations: [
    AppComponent,
    ListEmpleadosComponent,
    CreateEmpleadoComponent,
    NavbarComponent,
    SituacionIVAComponent,
    AuditoriaComponent,
    CreateIvaComponent,
    UsuariosComponent,
    CreateUsuarioComponent,
    LoginComponent,
    AuditoriaIvaComponent,
    LoginEmpresasComponent,
    CreateEmpresaComponent,
    DataTableComponent,
    RestaurarBackupComponent,
    ContaduriaComponent,
    LibrodiarioComponent,
    MayordiarioComponent,
    BalanceGeneralComponent,
    AsientosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatTabsModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    NgxPrintModule,
    HttpClientModule,
    FileSaverModule,
  ],
  providers: [RolService, ExcelService,EmpresaService, FileSaverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
