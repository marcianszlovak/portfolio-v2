import { Component, OnInit } from '@angular/core';
import { Image } from '../../interfaces/image';

@Component({
  selector: 'app-image-bar',
  templateUrl: './image-bar.component.html',
  styleUrls: ['./image-bar.component.scss'],
})
export class ImageBarComponent implements OnInit {
  images: Image[];

  constructor() {}

  ngOnInit(): void {}
}
