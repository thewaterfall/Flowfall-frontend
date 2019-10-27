import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {BoardspaceComponent} from './components/boardspace/boardspace.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'boardspace'},
  {path: 'login', component: LoginComponent},
  {path: 'boardspace', component: BoardspaceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
