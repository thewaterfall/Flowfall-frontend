import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { BoardspaceComponent } from './components/boardspace/boardspace.component';
import { BoardComponent } from './components/board/board.component';
import { HeaderComponent } from './components/header/header.component';
import {MaterialModule} from './modules/material/material.module';
import {TokenStorageService} from './auth/services/token-storage.service';
import {AuthService} from './auth/services/auth.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './auth/interceptors/auth-interceptor';
import {ErrorInterceptor} from './auth/interceptors/error-interceptor';
import {LoginGuard} from './auth/guards/login.guard';
import {AuthGuard} from './auth/guards/auth.guard';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BoardService} from './services/board.service';
import { AddRowDialogComponent } from './components/dialogs/add-row-dialog/add-row-dialog.component';
import { AddColumnDialogComponent } from './components/dialogs/add-column-dialog/add-column-dialog.component';
import {BoardColumnService} from './services/board-column.service';
import {RowService} from './services/row.service';
import { AddBoardDialogComponent } from './components/dialogs/add-board-dialog/add-board-dialog.component';
import {UserService} from './services/user.service';
import { MenuDialogComponent } from './components/dialogs/menu-dialog/menu-dialog.component';
import {Oauth2Service} from './auth/services/oauth2.service';
import { Oauth2Component } from './components/oauth2/oauth2.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BoardspaceComponent,
    BoardComponent,
    HeaderComponent,
    AddRowDialogComponent,
    AddColumnDialogComponent,
    AddBoardDialogComponent,
    MenuDialogComponent,
    Oauth2Component
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule
  ],
  providers: [
    TokenStorageService,
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    AuthGuard,
    Oauth2Service,
    LoginGuard,
    BoardService,
    BoardColumnService,
    RowService,
    UserService
  ],
  entryComponents: [
    AddRowDialogComponent,
    AddColumnDialogComponent,
    AddBoardDialogComponent,
    MenuDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
