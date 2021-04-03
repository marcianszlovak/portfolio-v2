import { Component, OnInit } from '@angular/core';
import { Image } from '../../interfaces/image';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
})
export class AboutPageComponent implements OnInit {
  public technologies = [
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
      className: 'github',
      src: '/assets/images/iconmonstr-github-1.svg',
      alt: 'github',
      isClickable: true,
      externalLink: 'https://github.com/marcianszlovak',
    },
    {
      className: 'linkedin',
      src: '/assets/images/iconmonstr-linkedin-3.svg',
      alt: 'linkedin',
      isClickable: true,
      externalLink: 'https://www.linkedin.com/in/marcian-szlovak/',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
