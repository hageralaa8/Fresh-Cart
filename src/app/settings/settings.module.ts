import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeUserDataComponent } from './change-user-data/change-user-data.component';


@NgModule({
  declarations: [
    ChangePasswordComponent,
    ChangeUserDataComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
