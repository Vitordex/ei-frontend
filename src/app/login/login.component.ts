import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Constants } from 'src/constants';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public emailControl = new FormControl('', [Validators.required]);
  public passwordControl = new FormControl('', [Validators.required]);
  public mode = 'determinate';
  public validForm = false;
  public hidePassword = true;

  constructor(
    private auth: AuthService,
    private router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() { }

  public validateForm() {
    const inputsHasErrors =
      this.emailControl.errors != null ||
      this.passwordControl.errors != null;

    const inputsDirty =
      this.passwordControl.dirty &&
      this.emailControl.dirty;

    this.validForm = !inputsHasErrors && inputsDirty;
  }

  public async login() {
    this.mode = 'indeterminate';

    let message: string = 'Login realizado';
    const action: string = 'OK';
    let config = new MatSnackBarConfig();
    config.panelClass = ['success'];

    let success = true;

    let response;

    try {
      const email = this.emailControl.value;
      const password = this.passwordControl.value;
      response = await this.auth.login(email, password);
    } catch (error) {
      success = false;

      config.panelClass = ['fail']
      config.duration = 10000;
      
      switch (error.status) {
        case 401:
          message = 'Usuário inativo ou desabilitado';
          break;
        case 400:
          message = 'Houve um erro, repita o processo';
          break;
        case 404:
          message = 'Usuário ou senha incorretos';
          break;
        case 500:
          message = 'Não foi possível realizar seu login';
          break;
        default:
          message = 'Houve um erro';
          break;
      }
    }

    this.snackBar.open(message, action, config);

    this.mode = 'determinate';

    if (!success) return;

    const token = response.headers.get(Constants.TOKEN_HEADER);
    sessionStorage.setItem(Constants.TOKEN_HEADER, token);
    this.router.navigate([Constants.ROUTES.ITEMS]);
  }
}
