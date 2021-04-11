import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsModule } from '../layouts/layouts.module';
import { JobComponent } from './job.component';
import { AlertModule } from '../layouts/alert/alert.module';

@NgModule({
  declarations: [JobComponent],
  imports: [CommonModule, LayoutsModule],
  exports: [JobComponent],
})
export class JobModule {}
