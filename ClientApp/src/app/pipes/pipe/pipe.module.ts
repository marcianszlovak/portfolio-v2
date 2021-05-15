import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownPipe } from './markdown.pipe';
import { CustomDatePipe } from './custom-date.pipe';

@NgModule({
  declarations: [MarkdownPipe, CustomDatePipe],
  imports: [CommonModule],
  exports: [MarkdownPipe, CustomDatePipe],
})
export class PipeModule {}
