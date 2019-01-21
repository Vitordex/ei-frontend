import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm, ValidationErrors } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomValidators } from './custom-validators.directive';
import { MatSnackBar, MatSnackBarConfig, ErrorStateMatcher } from '@angular/material';
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

  public hidePassword = true;
  public hideConfirm = true;

  public submitting: boolean = false;

  public passwordControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(40),
    Validators.minLength(8),
    CustomValidators.atLeastOneSpecial,
    CustomValidators.atLeastOneLowercase,
    CustomValidators.atLeastOneUppercase,
    CustomValidators.atLeastOneNumber
  ]);

  public confirmControl = new FormControl('', [
    Validators.required,
    CustomValidators.equal(this.passwordControl)
  ]);

  public changedPassword: boolean = false;

  public origin: string = window.location.origin;

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
    this.confirmControl.updateValueAndValidity();
    this.passwordControl.updateValueAndValidity();

    const inputsDirty =
      this.passwordControl.dirty &&
      this.confirmControl.dirty;

    const inputsHasErrors =
      this.confirmControl.errors != null ||
      this.passwordControl.errors != null;

    const inputsInvalid =
      this.passwordControl.invalid &&
      this.confirmControl.invalid;

    this.validForm = !inputsHasErrors && inputsDirty && !inputsInvalid;
  }

  public async onSend() {
    this.mode = 'indeterminate';
    this.submitting = true;

    let message: string = 'Senha alterada com sucesso';
    const action: string = 'OK';
    let config = new MatSnackBarConfig();
    config.panelClass = ['success'];

    let success = true;

    try {
      await this.service.patchRecoverPassword(
        this.passwordControl.value,
        this.authToken
      ).toPromise();
    } catch (error) {
      success = false;

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

    this.submitting = false;
    this.mode = 'determinate';

    this.changedPassword = success;
  }

  public getErrorMessage(controlName: string) {
    const control: FormControl = this[controlName];
    return control.hasError('required') ? 'Digite uma senha' :
      control.hasError('hasnospecial') ? 'A senha deve conter ao menos um caracter especial' :
        control.hasError('hasnonumber') ? 'A senha deve conter ao menos um número' :
          control.hasError('hasnouppercase') ? 'A senha deve conter ao menos uma letra maiúscula' :
            control.hasError('hasnolowercase') ? 'A senha deve conter ao menos uma letra minúscula' :
              control.hasError('maxlength') ? `A senha deve conter no máximo ${control.errors.maxlength.requiredLength} caracteres` :
                control.hasError('minlength') ? `A senha deve conter no mínimo ${control.errors.minlength.requiredLength} caracteres` :
                  control.hasError('different') ? 'Esta senha deve ser igual à anterior' :
                    '';
  }
}
