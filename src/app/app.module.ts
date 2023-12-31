import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatInputModule,
  MatProgressSpinnerModule,
  MatButtonModule,
  MatCardModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatPaginatorModule,
  MatTabsModule,
  MatBottomSheetModule,
  MatTableModule,
  MatIconModule
} from '@angular/material';

import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ChangePasswordFormComponent } from './change-password-form/change-password-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ChangePasswordService } from './change-password-service/change-password.service';
import { RouterModule, Route } from '@angular/router';
import { ItemsComponent } from './items/items.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthService } from './auth/auth.service';
import { ItemService } from './items-services/item.service';
import { ItemsPageComponent } from './items-page/items-page.component';
import { Constants } from 'src/constants';
import { EmailChangedComponent } from './email-changed/email-changed.component';
import { EmailConfirmedComponent } from './email-confirmed/email-confirmed.component';
import { PasswordInputComponent } from './password-input/password-input.component';

const routes: Route[] = [
  {
    path: Constants.ROUTES.CHANGE_PASSWORD, 
    component: ChangePasswordFormComponent
  },
  {
    path: Constants.ROUTES.ITEMS, 
    component: ItemsPageComponent, 
    canActivate: [AuthGuardService]
  },
  {
    path: Constants.ROUTES.LOGIN, 
    component: LoginComponent
  },
  {
    path: Constants.ROUTES.CHANGED_EMAIL,
    component: EmailChangedComponent
  },
  {
    path: Constants.ROUTES.EMAIL_CONFIRMED,
    component: EmailConfirmedComponent
  },
  {
    path: Constants.ROUTES.ALL, 
    component: NotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ChangePasswordFormComponent,
    ItemsComponent,
    LoginComponent,
    NotFoundComponent,
    ItemsPageComponent,
    EmailChangedComponent,
    EmailConfirmedComponent,
    PasswordInputComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatTabsModule,
    MatIconModule,
    MatBottomSheetModule,
    MatTableModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ChangePasswordService,
    AuthService,
    ItemService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
