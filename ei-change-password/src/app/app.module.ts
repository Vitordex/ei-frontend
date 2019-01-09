import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatProgressSpinnerModule, MatButtonModule, MatCardModule, MatTooltipModule, MatSnackBarModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ChangePasswordFormComponent } from './change-password-form/change-password-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ChangePasswordService } from './change-password-service/change-password.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    ChangePasswordFormComponent
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
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '', component: ChangePasswordFormComponent
      }
    ])
  ],
  providers: [
    ChangePasswordService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
