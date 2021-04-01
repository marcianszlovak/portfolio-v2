import { Image } from './image';

export interface Card {
  cardTitle: string;
  cardSubTitle: string;
  cardContent: string;
  cardAction: string;
  cardImage: Image;
  cardAvatarImage: Image;
}
