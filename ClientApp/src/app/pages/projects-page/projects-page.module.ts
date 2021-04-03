import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsPageRoutingModule } from './projects-page-routing.module';
import { ProjectsPageComponent } from './projects-page.component';
import { LayoutsModule } from '../../layouts/layouts.module';

@NgModule({
  declarations: [ProjectsPageComponent],
  imports: [CommonModule, ProjectsPageRoutingModule, LayoutsModule],
  exports: [ProjectsPageComponent],
})
export class ProjectsPageModule {}
