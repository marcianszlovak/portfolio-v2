import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  isLightTheme = true;

  constructor(public loaderService: LoaderService) {}

  ngOnInit(): void {
    this.isLightTheme = localStorage.getItem('theme') === 'Light';
  }

  storeThemeSelection(): void {
    localStorage.setItem('theme', this.isLightTheme ? 'Light' : 'Dark');
  }
}
