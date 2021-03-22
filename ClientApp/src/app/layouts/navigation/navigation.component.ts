import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  isLightTheme = true;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.isLightTheme = localStorage.getItem('theme') === 'Light';
  }

  storeThemeSelection(): void {
    localStorage.setItem('theme', this.isLightTheme ? 'Light' : 'Dark');
  }
}
