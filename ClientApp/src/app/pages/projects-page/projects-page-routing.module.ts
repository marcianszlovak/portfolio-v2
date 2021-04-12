import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsPageComponent } from './projects-page.component';
import { BfgVisualizerComponent } from '../../bfg-visualizer/bfg-visualizer.component';
import { JobComponent } from '../../job/job.component';

const routes: Routes = [
  {
    component: ProjectsPageComponent,
    path: '',
  },
  {
    component: BfgVisualizerComponent,
    path: 'bfg-visualizer',
  },
  {
    component: JobComponent,
    path: 'gh-jobs',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsPageRoutingModule {}
