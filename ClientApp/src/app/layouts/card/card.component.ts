import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() cardTitle: string;
  @Input() cardSubTitle: string;
  @Input() cardContent: string;
  @Input() cardButtonRouterLink: string;
  @Input() cardButtonExternalLink: string;
  @Input() isExternalLink = false;
  @Input() cardButtonText: string;
  @Input() cardImageSrc: string;
  @Input() cardImageAlt: string;
  @Input() cardImageClassName: string;
  @Input() cardAvatarImageSrc: string;
  @Input() cardAvatarImageAlt: string;
  @Input() cardAvatarImageClassName: string;

  constructor() {}

  ngOnInit(): void {}

  onExternalLinkClick(): void {
    window.open(this.cardButtonExternalLink);
  }
}
