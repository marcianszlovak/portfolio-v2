import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsModule } from '../layouts/layouts.module';
import { JobComponent } from './job.component';
import { PipeModule } from '../pipes/pipe/pipe.module';

@NgModule({
  declarations: [JobComponent],
  imports: [CommonModule, LayoutsModule, PipeModule],
  exports: [JobComponent],
})
export class JobModule {}
