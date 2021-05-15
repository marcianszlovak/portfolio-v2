import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { LayoutsModule } from './layouts/layouts.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { GoogleAnalyticsService } from './services/google-analytics.service';
import { InterceptorService } from './services/interceptor.service';
import { HttpErrorInterceptor } from './services/http-error.interceptor';
import { UtilModule } from './utils/util.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    LayoutsModule,
    HttpClientModule,
    UtilModule,
  ],
  providers: [
    GoogleAnalyticsService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
