import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { FooterComponent } from './footer/footer.component';
import { ImageBarComponent } from './image-bar/image-bar.component';

@NgModule({
  declarations: [NavigationComponent, FooterComponent, ImageBarComponent],
  imports: [CommonModule, RouterModule, FormsModule, MaterialModule],
  exports: [NavigationComponent, FooterComponent, ImageBarComponent],
})
export class LayoutsModule {}
