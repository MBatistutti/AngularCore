import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitiado: boolean;

  constructor(
    private _usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    this.activatedRoute.queryParams.subscribe(params => {
      if(params['token']){
        this._usuarioService.setToken(params['token']);
      }
    });
  }

  ngOnInit() {
    this.submitiado = false;
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

    if (this._usuarioService.checkToken()) {
      this.router.navigate(['/home']);
    }
  }

  get username() { return this.loginForm.get('username') }
  get password() { return this.loginForm.get('password') }

  onSubmit() {
    this.submitiado = true;
    if (this.loginForm.invalid) {
      return;
    }
    this._usuarioService.login(new Usuario(this.loginForm.controls.username.value, this.loginForm.controls.password.value))
      .subscribe(r => this.router.navigate(['/home']));
  }

}
