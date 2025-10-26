import { Component, computed, inject } from '@angular/core';
import { GifsService } from '../../services/gif.service';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search-page.html',
})
export default class Search {
  constructor() {}
  onSearch(query: string) {
    this.gifsService.searchGifs(query);
  }
  isLoading = computed(() => this.gifsService.isLoading());
  gifsService = inject(GifsService);
  imageSources = computed(() => this.gifsService.searchedGifs());
}
