import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {BoardspaceComponent} from './components/boardspace/boardspace.component';
import {AuthGuard} from './auth/guards/auth.guard';
import {LoginGuard} from './auth/guards/login.guard';
import {BoardComponent} from './components/board/board.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'boardspace'},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'boardspace', component: BoardspaceComponent, canActivate: [AuthGuard]},
  {path: 'b/:id', component: BoardComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
