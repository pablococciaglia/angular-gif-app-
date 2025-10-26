import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  inject,
  OnDestroy,
  viewChild,
} from '@angular/core';
import { GifListItem } from '../../components/gif-list-item/gif-list-item';
import { GifsService } from '../../services/gif.service';
import { ScrollStateService } from '../../services/scrollState.service';

@Component({
  selector: 'app-trending',
  imports: [GifListItem],
  templateUrl: './trending-page.html',
})
export default class TrendingPage implements AfterViewInit {
  gifsService = inject(GifsService);
  scrollState = inject(ScrollStateService);
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupGifs');

  trendingGifs = this.gifsService.trendingGifs;
  imageSources = computed(() => this.gifsService.trendingGifs());
  ngAfterViewInit() {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (scrollDiv) {
      // Restore saved scroll position
      scrollDiv.scrollTop = this.scrollState.getScrollPosition('trending');
    }
  }
  onScroll(event: Event) {
    this.scrollState.saveScrollPosition('trending', (event.target as HTMLDivElement).scrollTop);
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;
    const threshold = 150;
    if (scrollDiv.scrollTop + scrollDiv.clientHeight >= scrollDiv.scrollHeight - threshold) {
      this.gifsService.loadMoreTrendingGifs();
    }
  }
}
