import { Component } from '@angular/core';
import { GifsSideMenuOptions } from '../gifs-side-menu-options/gifs-side-menu-options';
import { GifsSideMenuHeader } from '../gifs-side-menu-header/gifs-side-menu-header';
import { GifsSideMenuHistory } from '../gifs-side-menu-history/gifs-side-menu-history';

@Component({
  selector: 'gifs-side-menu',
  imports: [GifsSideMenuOptions, GifsSideMenuHeader, GifsSideMenuHistory],
  templateUrl: './gifs-side-menu.html',
})
export class GifsSideMenu {}
