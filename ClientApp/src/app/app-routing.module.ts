import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'projects',
    loadChildren: () =>
      import('./pages/projects-page/projects-page.module').then(
        (m) => m.ProjectsPageModule
      ),
  },
  {
    path: '',
    loadChildren: async () =>
      import('./pages/homepage/homepage.module').then((m) => m.HomepageModule),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
