import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BfgVisualizerComponent } from './bfg-visualizer.component';
import { MaterialModule } from '../layouts/material.module';
import { LayoutsModule } from '../layouts/layouts.module';

@NgModule({
  declarations: [BfgVisualizerComponent],
  exports: [BfgVisualizerComponent],
  imports: [CommonModule, MaterialModule],
})
export class BfgVisualizerModule {}
