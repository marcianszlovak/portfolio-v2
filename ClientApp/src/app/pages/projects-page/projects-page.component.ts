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
        cardTitle: 'BFG9000 Visualizer',
        cardSubTitle: 'From the classic Doom',
        cardContent:
          'The most powerful weapon from the classic Doom games is often misunderstood.' +
          ' It has a unique mechanic for damaging opponents which is hard to find out unless you do some research. ' +
          // prettier-ignore
          'This online tool visualizes what\'s happening the moment you pull the BFG\'s trigger.',
        cardImage: {
          className: 'mat-card-image',
          src: 'assets/images/bfg-card.png',
          alt: 'bfg-visualizer',
        },
        cardAvatarImage: {
          className: 'mat-card-avatar',
          src: 'assets/images/Bfg9000_prev.png',
          alt: 'bfg-visualizer-avatar',
        },
        cardButtonRouterLink: 'bfg-visualizer',
        cardButtonText: 'View project',
      },

      {
        cardTitle: 'greenBay',
        cardSubTitle: 'An eBay clone made with React, Node.js and MongoDB',
        cardContent:
          'Users can sell, buy, review items listed on the market. Users can get their listed items and add/update/delete new items. Users can also edit their profile, change their password, upload a new avatar. Admins can manage users including adding/updating/deleting users. \nTry it out by registering! It might take a few seconds to load since the app is hosted on Heroku.',
        cardImage: {
          className: 'mat-card-image',
          src: 'assets/images/ecommerce-1.png',
          alt: 'e-commerce',
        },
        cardAvatarImage: {
          className: 'mat-card-avatar',
          src: 'assets/images/Leaf_icon_15.svg',
          alt: 'e-commerce-avatar',
        },
        isExternalLink: true,
        cardButtonExternalLink: 'https://greenbay-webshop.herokuapp.com',
        cardButtonText: 'View project',
      },
    ];
  }

  ngOnInit(): void {}
}
