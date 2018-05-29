import { Injectable } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { LoginComponent } from './Login/login/login.component';
import { HomeComponent } from './Pages/home/home.component';
import { UsuarioService } from './services/usuario.service';

const approutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [UsuarioService] },
  { path: '', component: LoginComponent },
  { path: '**', component: LoginComponent }
];

export const APP_ROUTES = RouterModule.forRoot(approutes, { useHash: true });
