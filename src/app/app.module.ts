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
  MatTableModule
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

const routes: Route[] = [
  {
    path: 'change/password', component: ChangePasswordFormComponent
  },
  {
    path: 'items', component: ItemsComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '**', component: NotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ChangePasswordFormComponent,
    ItemsComponent,
    LoginComponent,
    NotFoundComponent
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
    MatBottomSheetModule,
    MatTableModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ChangePasswordService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
