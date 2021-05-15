import { Component, Input, OnInit } from '@angular/core';
import { Image } from '../../interfaces/image';

@Component({
  selector: 'app-image-bar',
  templateUrl: './image-bar.component.html',
  styleUrls: ['./image-bar.component.scss'],
})
export class ImageBarComponent implements OnInit {
  @Input() images: Image[];

  constructor() {}

  ngOnInit(): void {}
}
