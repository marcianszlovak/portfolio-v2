import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage.component';
import { BfgVisualizerModule } from '../../bfg-visualizer/bfg-visualizer.module';
import { BfgVisualizerComponent } from '../../bfg-visualizer/bfg-visualizer.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'bfg-visualizer',
    component: BfgVisualizerComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, BfgVisualizerModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class HomepageRoutingModule {}
