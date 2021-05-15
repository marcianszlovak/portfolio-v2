import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutPageComponent } from './about-page.component';
import { LayoutsModule } from '../../layouts/layouts.module';
import { MaterialModule } from '../../layouts/material.module';
import { AboutPageRoutingModule } from './about-page-routing.module';

@NgModule({
  declarations: [AboutPageComponent],
  imports: [
    CommonModule,
    LayoutsModule,
    MaterialModule,
    AboutPageRoutingModule,
  ],
  exports: [AboutPageComponent],
})
export class AboutPageModule {}
