import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Imports Propios

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MiComponenteComponent } from './components/mi-componente/mi-componente.component';
import { TableexampleComponent } from './components/tableexample/tableexample.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Firebase
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ToastrModule } from 'ngx-toastr';
//Components
import { TabsComponent } from './components/tabs/tabs.component';
import { TableComponent } from './components/table/table.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { ButtonComponent } from './components/button/button.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
//authO
import { AuthModule } from '@auth0/auth0-angular';
//Material
import {MaterialModule} from './material-module';

//Services
import { AuditoriaService } from './services/auditoria.service';
import { ClienteService } from './services/clientes.service';
import { SivaService } from './services/siva.service';
import { UsuariosService } from './services/usuarios.service';
import { DatabaseService } from './services/database.service';
import { ListClientesComponent } from './components/list-clientes/list-clientes.component';
import { CreateClientesComponent } from './components/create-clientes/create-clientes.component'; 

@NgModule({
  declarations: [
    AppComponent,
    MiComponenteComponent,
    TabsComponent,
    TableComponent,
    DialogComponent,
    ButtonComponent,
    TooltipComponent,
    TableexampleComponent,
    ListClientesComponent,
    CreateClientesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ToastrModule.forRoot(),
    AngularFireStorageModule,
    AuthModule.forRoot({
      domain: 'YOUR_DOMAIN',
      clientId: 'YOUR_CLIENT_ID'
    }),
  ],
  providers: [
    AuditoriaService,
    ClienteService,
    SivaService,
    UsuariosService,
    DatabaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
