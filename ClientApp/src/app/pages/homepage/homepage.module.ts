import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage.component';
import { HomepageRoutingModule } from './homepage-routing.module';
import { LayoutsModule } from '../../layouts/layouts.module';
import { BfgVisualizerModule } from '../../bfg-visualizer/bfg-visualizer.module';

@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    LayoutsModule,
    BfgVisualizerModule,
  ],
  exports: [HomepageComponent],
})
export class HomepageModule {}
