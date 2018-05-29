import { Injectable } from "@angular/core";
import { Usuario } from "../models/usuario.model";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class UsuarioService implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkToken();
  }

  checkToken(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    }
   
    this.router.navigate(['/login']);
    return false;
  }

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
  }

 setToken(token:string){
   localStorage.setItem('token',token)
 }

  login(usuario: Usuario) {
    let url = './api/Token/GetToken';
    return this.http.post(url, usuario)
      .pipe(
        map((resp: any) => {
          this.setToken(resp.token);
          return true;
        })
        , catchError(err => {
          return Observable.throw(err);
        })
      );
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
