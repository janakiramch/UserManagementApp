import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserDetailFormComponent } from './user-details/user-detail-form/user-detail-form.component';
import { HttpClientModule } from '@angular/common/http';
import { SavedUsersComponent } from './user-details/saved-users/saved-users.component';
import { UserEditFormComponent } from './user-details/user-edit-form/user-edit-form.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    UserDetailsComponent,
    UserDetailFormComponent,
    SavedUsersComponent,
    UserEditFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
