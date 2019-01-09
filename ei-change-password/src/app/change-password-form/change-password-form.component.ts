import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.css']
})
export class ChangePasswordFormComponent implements OnInit {
  mode = 'determinate';
  validForm = false;

  passwordControl = new FormControl('', [
    Validators.required
  ]);

  confirmControl = new FormControl('', [
    Validators.required
  ])

  constructor() {

  }

  ngOnInit() {

  }

  validateForm() {
    const inputsHasErrors = this.confirmControl.errors != null
      || this.passwordControl.errors != null;
    const inputsDirty = this.passwordControl.dirty && this.confirmControl.dirty;

    this.validForm = !inputsHasErrors && inputsDirty;
  }

  async onSend() {
    this.mode = 'indeterminate';

    await new Promise((resolve) => {
      setTimeout(resolve, 400);
    });

    this.mode = 'determinate';
  }
}
