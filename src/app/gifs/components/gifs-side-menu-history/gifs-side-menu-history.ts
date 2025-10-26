import { Component, inject } from '@angular/core';
import { GifsService } from '../../services/gif.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'gifs-side-menu-history',
  imports: [RouterLink],
  templateUrl: './gifs-side-menu-history.html',
})
export class GifsSideMenuHistory {
  getResults(query: string) {
    this.gifsService.searchGifs(query);
  }
  gifsService = inject(GifsService);
  keys = this.gifsService.searchHistorykeys;
}
