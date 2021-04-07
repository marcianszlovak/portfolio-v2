import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { FooterComponent } from './footer/footer.component';
import { ImageBarComponent } from './image-bar/image-bar.component';
import { ImageComponent } from './image/image.component';
import { CardComponent } from './card/card.component';
import { AlertModule } from './alert/alert.module';

@NgModule({
  declarations: [
    NavigationComponent,
    FooterComponent,
    ImageBarComponent,
    ImageComponent,
    CardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MaterialModule,
    AlertModule,
  ],
  exports: [
    NavigationComponent,
    FooterComponent,
    ImageBarComponent,
    ImageComponent,
    CardComponent,
  ],
})
export class LayoutsModule {}
