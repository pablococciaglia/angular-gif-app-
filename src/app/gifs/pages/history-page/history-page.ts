import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { GifsService } from '../../services/gif.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'history-page',
  imports: [],
  templateUrl: './history-page.html',
})
export default class HistoryPage {
  constructor() {
    if (this.imageSources().length === 0) {
      this.gifsService.searchGifs(this.query());
    }
  }
  query = toSignal(inject(ActivatedRoute).params.pipe(map((params) => params['query'])));
  gifsService = inject(GifsService);
  imageSources = computed(() => this.gifsService.searchedGifs());
}
