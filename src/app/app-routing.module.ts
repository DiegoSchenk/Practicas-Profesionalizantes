import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEmpleadoComponent } from './components/create-empleado/create-empleado.component';
import { ListEmpleadosComponent } from './components/list-empleados/list-empleados.component';
import { SituacionIVAComponent } from './components/situacion-iva/situacion-iva.component';
import { AuditoriaComponent } from './components/auditoria/auditoria.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CreateIvaComponent } from './components/create-iva/create-iva.component';
import { CreateUsuarioComponent } from './components/create-usuario/create-usuario.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AuditoriaIvaComponent } from './components/auditoria-iva/auditoria-iva.component';
import { LoginEmpresasComponent } from './components/login-empresas/login-empresas.component';
import { CreateEmpresaComponent } from './components/create-empresa/create-empresa.component';
import { RestaurarBackupComponent } from './components/restaurar-backup/restaurar-backup.component';
import { ContaduriaComponent } from './components/contaduria/contaduria.component';
import { AsientosComponent } from './components/asientos/asientos.component';
import { BalanceGeneralComponent } from './components/balance-general/balance-general.component';
import { LibrodiarioComponent } from './components/librodiario/librodiario.component';
import { MayordiarioComponent } from './components/mayordiario/mayordiario.component';


const routes: Routes = [
  { path: '', redirectTo: 'login-empresas', pathMatch: 'full' },
  { path: 'login-empresas', component: LoginEmpresasComponent },
  { path: 'login', component: LoginComponent },
  { path: 'list-empleados', component: ListEmpleadosComponent ,canActivate: [AuthGuard]},
  { path: 'restaurar-backup', component: RestaurarBackupComponent ,canActivate: [AuthGuard]},
  { path: 'contaduria', component: ContaduriaComponent ,canActivate: [AuthGuard]},
  { path: 'create-empleado', component: CreateEmpleadoComponent,canActivate: [AuthGuard] },
  { path: 'asientos', component: AsientosComponent,canActivate: [AuthGuard] },
  { path: 'balance-general', component: BalanceGeneralComponent,canActivate: [AuthGuard] },
  { path: 'librodiario', component: LibrodiarioComponent,canActivate: [AuthGuard] },
  { path: 'mayordiario', component: MayordiarioComponent,canActivate: [AuthGuard] },
  { path: 'create-empresa', component: CreateEmpresaComponent },
  { path: 'editEmpleado/:id', component: CreateEmpleadoComponent},
  { path: 'editSituacionIVA/:id', component: CreateIvaComponent},
  { path: 'editUsuario/:id', component: CreateUsuarioComponent},
  { path: 'situacioniva', component: SituacionIVAComponent,canActivate: [AuthGuard]},
  { path: 'auditoria', component: AuditoriaComponent,canActivate: [AuthGuard]},
  { path: 'usuarios', component: UsuariosComponent,canActivate: [AuthGuard]},
  { path: 'create-usuarios', component: CreateUsuarioComponent,canActivate: [AuthGuard] },
  { path: 'create-iva', component: CreateIvaComponent,canActivate: [AuthGuard] },
  { path: 'auditoria-iva', component: AuditoriaIvaComponent,canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'list-empleados', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
