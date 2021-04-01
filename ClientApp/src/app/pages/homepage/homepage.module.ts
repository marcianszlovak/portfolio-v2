import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage.component';
import { HomepageRoutingModule } from './homepage-routing.module';
import { LayoutsModule } from '../../layouts/layouts.module';
import { MaterialModule } from '../../layouts/material.module';

@NgModule({
  declarations: [HomepageComponent],
  imports: [CommonModule, HomepageRoutingModule, LayoutsModule, MaterialModule],
  exports: [HomepageComponent],
})
export class HomepageModule {}
