import { Component, OnInit } from '@angular/core';
import { Image } from '../../interfaces/image';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  images: Image[];

  constructor() {
    this.images = [
      {
        src:
          'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Aligning_Items_in_a_Flex_Container/align3.png',
        alt: 'hello',
        className: 'hello',
      },
    ];
  }

  ngOnInit(): void {}
}
