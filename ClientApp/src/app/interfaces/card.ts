import { Image } from './image';

export interface Card {
  cardTitle: string;
  cardSubTitle: string;
  cardContent: string;
  cardButtonRouterLink?: string;
  cardButtonExternalLink?: string;
  isExternalLink?: boolean;
  cardButtonText: string;
  cardImage: Image;
  cardAvatarImage: Image;
}
