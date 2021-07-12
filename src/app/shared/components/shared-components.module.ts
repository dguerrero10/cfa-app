import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavComponent } from './top-nav/top-nav.component';
import { MaterialModule } from '../material/material.module';
import { AccountSettingsModalComponent } from './account-settings-modal/account-settings-modal.component';



@NgModule({
  declarations: [TopNavComponent, AccountSettingsModalComponent],
  imports: [
    MaterialModule,
    CommonModule
  ],
  exports: [TopNavComponent]
})
export class SharedComponentsModule { }
