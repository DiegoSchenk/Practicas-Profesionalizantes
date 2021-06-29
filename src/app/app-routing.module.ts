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



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'list-empleados', component: ListEmpleadosComponent },
  { path: 'create-empleado', component: CreateEmpleadoComponent },
  { path: 'editEmpleado/:id', component: CreateEmpleadoComponent },
  { path: 'situacioniva', component: SituacionIVAComponent},
  { path: 'auditoria', component: AuditoriaComponent},
  { path: 'usuarios', component: UsuariosComponent},
  { path: 'create-usuarios', component: CreateUsuarioComponent },
  { path: 'create-iva', component: CreateIvaComponent },
  { path: '**', redirectTo: 'list-empleados', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
