import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuOption {
  icon: string;
  label: string;
  route: string;
  sublabel: string;
}

@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './gifs-side-menu-options.html',
})
export class GifsSideMenuOptions {
  menuOptions: MenuOption[] = [
    {
      icon: 'fa-solid fa-fire',
      label: 'Trending',
      route: '/dashboard/trending',
      sublabel: 'Popular gifs',
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Search',
      route: '/dashboard/search',
      sublabel: 'Find your gifs',
    },
  ];
}
