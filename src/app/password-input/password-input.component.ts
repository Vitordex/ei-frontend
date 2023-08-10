import { Component, OnInit, Input, Output } from '@angular/core';
import { Validators, FormControl, ValidatorFn, Validator } from '@angular/forms';
import { CustomValidators } from '../change-password-form/custom-validators.directive';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.css']
})
export class PasswordInputComponent implements OnInit {

  @Input('placeholder') public placeholder: string;

  @Input('validator-functions') public validatorFunctions : string = '';

  @Input('control')
  public control = new FormControl();

  private validatorMessages = {};
  private validForm: boolean;

  constructor() {}

  ngOnInit() {
    if(this.validatorFunctions === '') return;
    
    const clearNames: string = this.validatorFunctions.replace(/(\n|\s{3,})/g, '');
    const functionNames: string[] = clearNames.split(',');

    const mapFunction = (rawMethod: string) => {
      const params = rawMethod.split('|');
      const [name, param, message] = params;

      this.validatorMessages[name] = message;

      let method: any = Validators[name] || CustomValidators[name];

      if(param) method = method(param);

      return method;
    };
    const validators: ValidatorFn[] = functionNames.map(mapFunction);
    this.control = new FormControl('', validators);
  }

  public validateInput(){
    const inputsHasErrors = this.control.errors != null;

    const inputsDirty = this.control.dirty;

    this.validForm = !inputsHasErrors && inputsDirty;
  }

  public getErrorMessage(): string{
    const errors = Object.keys(this.control.errors);
    return this.validatorMessages[errors[0]];
  }

  public get IsValid(): boolean{
    return this.validForm;
  }
}
