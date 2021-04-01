import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomepageModule } from './pages/homepage/homepage.module';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { LayoutsModule } from './layouts/layouts.module';
import { ProjectsPageModule } from './pages/projects-page/projects-page.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    LayoutsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
