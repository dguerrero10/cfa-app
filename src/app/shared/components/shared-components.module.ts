import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavComponent } from './top-nav/top-nav.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [TopNavComponent],
  imports: [
    MaterialModule,
    CommonModule
  ],
  exports: [TopNavComponent]
})
export class SharedComponentsModule { }
