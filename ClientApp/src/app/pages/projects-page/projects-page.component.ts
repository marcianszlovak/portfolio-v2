import { Component, OnInit } from '@angular/core';
import { Card } from '../../interfaces/card';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss'],
})
export class ProjectsPageComponent implements OnInit {
  cards: Card[];

  constructor() {
    this.cards = [
      {
        cardAction: 'hello cat',
        cardContent: 'cat',
        cardImage: {
          className: 'mat-card-image',
          src:
            'https://lh3.googleusercontent.com/proxy/N1shOE6TvvMO5tt20i2NM44DIxrNxMmePp8nLVEeWVnlykTfZpkrES8JAOjZ_oLRvEXjSksmChkCysD-Z_DcMYAZ8nCFODQeYtip4ui_VrfneihG',
          alt: 'hello',
        },
        cardAvatarImage: {
          className: 'mat-card-avatar',
          src:
            'https://lh3.googleusercontent.com/proxy/N1shOE6TvvMO5tt20i2NM44DIxrNxMmePp8nLVEeWVnlykTfZpkrES8JAOjZ_oLRvEXjSksmChkCysD-Z_DcMYAZ8nCFODQeYtip4ui_VrfneihG',
          alt: 'hello',
        },
        cardSubTitle: 'cat sub-title',
        cardTitle: 'cat title',
      },
    ];
  }

  ngOnInit(): void {}
}
