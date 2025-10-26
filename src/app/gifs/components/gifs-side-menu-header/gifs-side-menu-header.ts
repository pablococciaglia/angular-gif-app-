import { Component } from '@angular/core';
import { environment } from '@envs/environment';

@Component({
  selector: 'gifs-side-menu-header',
  imports: [],
  templateUrl: './gifs-side-menu-header.html',
})
export class GifsSideMenuHeader {
  envs = environment;
}
