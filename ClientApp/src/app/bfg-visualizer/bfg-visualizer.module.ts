import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BfgVisualizerComponent } from './bfg-visualizer.component';
import { MaterialModule } from '../layouts/material.module';
import { LayoutsModule } from '../layouts/layouts.module';
import { AlertModule } from '../layouts/alert/alert.module';

@NgModule({
  declarations: [BfgVisualizerComponent],
  exports: [BfgVisualizerComponent],
  imports: [CommonModule, MaterialModule, LayoutsModule, AlertModule],
})
export class BfgVisualizerModule {}
