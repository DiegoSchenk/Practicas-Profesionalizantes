import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Imports Propios

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MiComponenteComponent } from './components/mi-componente/mi-componente.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Firebase
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
//Components
import { TabsComponent } from './components/tabs/tabs.component';
import { TableComponent } from './components/table/table.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { ButtonComponent } from './components/button/button.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
//Services
import { AuditoriaService } from './services/auditoria.service';
import { ClientesService } from './services/clientes.service';
import { SivaService } from './services/siva.service';
import { UsuariosService } from './services/usuarios.service';
import { DatabaseService } from './services/database.service'; 

@NgModule({
  declarations: [
    AppComponent,
    MiComponenteComponent,
    TabsComponent,
    TableComponent,
    DialogComponent,
    ButtonComponent,
    TooltipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [
    AuditoriaService,
    ClientesService,
    SivaService,
    UsuariosService,
    DatabaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
