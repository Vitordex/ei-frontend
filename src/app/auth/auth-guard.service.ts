import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(): boolean {
      if(!this.auth.isAuthenticated()){
          this.router.navigate(['frontend/login']);
          return false;
      }

      return true;
  }
};
