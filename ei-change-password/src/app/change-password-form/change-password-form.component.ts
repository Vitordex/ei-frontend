import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ChangePasswordService } from '../change-password-service/change-password.service';
import { ActivatedRoute } from '@angular/router';

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
    Validators.required
  ]);

  confirmControl = new FormControl('', [
    Validators.required
  ])

  constructor(private service: ChangePasswordService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.authToken = params.get('token');
    });
  }

  validateForm() {
    const inputsHasErrors =
      this.confirmControl.errors != null ||
      this.passwordControl.errors != null;

    const inputsDirty =
      this.passwordControl.dirty &&
      this.confirmControl.dirty;

    this.validForm = !inputsHasErrors && inputsDirty;
  }

  async onSend() {
    this.mode = 'indeterminate';

    try {
      const result = await this.service.patchRecoverPassword(
        this.passwordControl.value,
        this.authToken
      ).toPromise(); 
    } catch (error) {
      switch (error.status) {
        case 404:
          console.log('Die');
          break;
      
        default:
          break;
      }
    }

    this.mode = 'determinate';
  }
}
