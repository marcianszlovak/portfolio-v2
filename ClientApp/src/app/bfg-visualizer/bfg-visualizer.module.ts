import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BfgVisualizerComponent } from './bfg-visualizer.component';

@NgModule({
  declarations: [BfgVisualizerComponent],
  exports: [BfgVisualizerComponent],
  imports: [CommonModule],
})
export class BfgVisualizerModule {}
