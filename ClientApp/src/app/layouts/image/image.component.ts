import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {
  @Input() src: string;
  @Input() alt: string;
  @Input() className: string;
  @Input() id: string;
  @Input() isClickable = false;
  @Input() externalLink: string;
  constructor() {}

  ngOnInit(): void {}
}
