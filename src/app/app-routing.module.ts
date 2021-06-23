import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateClientesComponent } from './components/create-clientes/create-clientes.component';
import { ListClientesComponent } from './components/list-clientes/list-clientes.component';

const routes: Routes = [
  { path: '', redirectTo: 'list-clientes', pathMatch: 'full' },
  { path: 'list-clientes', component: ListClientesComponent },
  { path: 'create-cliente', component: CreateClientesComponent },
  { path: 'editCliente/:id', component: CreateClientesComponent },
  { path: '**', redirectTo: 'list-clientes', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
