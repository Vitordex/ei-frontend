import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Constants } from 'src/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public emailControl = new FormControl('', [Validators.required]);
  public passwordControl = new FormControl('', [Validators.required]);

  constructor(private auth: AuthService) { }

  ngOnInit() { }

  public async login() {
    let response: any;

    try {
      const email = this.emailControl.value;
      const password = this.passwordControl.value;

      response = await this.auth.login(email, password);
    } catch (error) {
      throw error;
    }

    const token = response.headers.get(Constants.TOKEN_HEADER);
    sessionStorage.setItem(Constants.TOKEN_HEADER, token);
  }
}
