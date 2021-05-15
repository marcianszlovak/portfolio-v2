import { Component, OnInit } from '@angular/core';
import { Image } from '../../interfaces/image';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
})
export class AboutPageComponent implements OnInit {
  public technologies: string[] = [
    '.NET / .NET Core',
    'Java',
    'Node.js',
    'Angular',
    'React',
    'MySQL',
    'MongoDB',
  ];

  public images: Image[] = [
    {
      id: 'github',
      className: 'github',
      src: '/assets/images/github.svg',
      alt: 'github',
      isClickable: true,
      externalLink: 'https://github.com/marcianszlovak',
    },
    {
      id: 'linkedin',
      className: 'linkedin',
      src: '/assets/images/linkedin.svg',
      alt: 'linkedin',
      isClickable: true,
      externalLink: 'https://www.linkedin.com/in/marcian-szlovak/',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
