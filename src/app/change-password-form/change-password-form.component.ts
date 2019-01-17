import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomValidators } from './custom-validators.directive';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.css']
})
export class ChangePasswordFormComponent implements OnInit {
  mode = 'determinate';
  validForm = false;
  authToken = '';

  passwordControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(40),
    Validators.minLength(8),
    CustomValidators.atLeastOneSpecial,
    CustomValidators.atLeastOneLowercase,
    CustomValidators.atLeastOneUppercase,
    CustomValidators.atLeastOneNumber
  ]);

  confirmControl = new FormControl('', [
    Validators.required,
    CustomValidators.equal(this.passwordControl)
  ])

  constructor(
    private service: AuthService,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.authToken = params.get('token') || this.authToken;
    });
  }

  public validateForm() {
    const inputsHasErrors =
      this.confirmControl.errors != null ||
      this.passwordControl.errors != null;

    const inputsDirty =
      this.passwordControl.dirty &&
      this.confirmControl.dirty;

    this.validForm = !inputsHasErrors && inputsDirty;
  }

  public async onSend() {
    this.mode = 'indeterminate';

    let message: string = 'Senha alterada com sucesso';
    const action: string = 'OK';
    let config = new MatSnackBarConfig();
    config.panelClass = ['success'];

    try {
      await this.service.patchRecoverPassword(
        this.passwordControl.value,
        this.authToken
      ).toPromise();
    } catch (error) {
      config.panelClass = ['fail']
      config.duration = 10000;
      switch (error.status) {
        case 401:
          message = 'Há um problema com seu token';
          break;
        case 400:
          message = 'Houve um erro, repita o processo';
          break;
        case 500:
          message = 'Não foi possível salvar sua senha. Tente novamente';
          break;
        default:
          message = 'Houve um erro';
          break;
      }
    }

    this.snackBar.open(message, action, config);

    this.mode = 'determinate';
  }
}
