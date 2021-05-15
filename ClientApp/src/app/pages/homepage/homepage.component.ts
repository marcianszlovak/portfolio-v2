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
        src: 'assets/images/dotnet-core.svg',
        alt: 'dotnet-logo',
        className: 'dotnet-logo',
      },
      {
        src: 'assets/images/java.svg',
        alt: 'java-logo',
        className: 'java-logo',
      },
      {
        src: 'assets/images/nodejs-icon.svg',
        alt: 'nodejs-logo',
        className: 'nodejs-logo',
      },
      {
        src: 'assets/images/angular.svg',
        alt: 'angular-logo',
        className: 'angular-logo',
      },
      {
        src: 'assets/images/react.svg',
        alt: 'react-logo',
        className: 'react-logo',
      },
    ];
  }

  ngOnInit(): void {}
}
