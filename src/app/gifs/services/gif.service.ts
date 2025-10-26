import { Injectable, signal, inject, computed } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@envs/environment';
import type { GiphyTrendingResponse } from '../interfaces/giphyTrendingResponse.interface';
import { Gif } from '../interfaces/gif.interface';
import { GiffMapper } from '../mapper/gif.mapper';
import { tap } from 'rxjs';
import { BrowserStorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private storage = inject(BrowserStorageService);
  private http = inject(HttpClient);
  private apiKey: string = environment.apiKeys.giphy;
  private serviceUrl: string = environment.giphyURL;
  constructor() {
    this.getTrendingGifs();
    const storageHistory = this.storage.get('searchHistory');
    this.searchHistory.set(storageHistory ? JSON.parse(storageHistory) : {});
  }
  trendingGifs = signal<Gif[]>([]);
  searchedGifs = signal<Gif[]>([]);
  isLoading = signal<boolean>(false);
  searchHistory = signal<Record<string, Gif[]>>({});
  searchHistorykeys = computed(() => Object.keys(this.searchHistory()));

  searchGifs(query: string): void {
    this.isLoading.set(true);
    query = query.trim().toLowerCase();

    if (this.searchHistorykeys().includes(query.toLocaleLowerCase())) {
      this.searchedGifs.set(this.searchHistory()[query.toLocaleLowerCase()]);
      this.isLoading.set(false);
      return;
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', query)
      .set('limit', '25')
      .set('rating', 'g')
      .set('bundle', 'messaging_non_clips');

    this.http
      .get<GiphyTrendingResponse>(`${this.serviceUrl}/search`, { params })
      .pipe(
        tap((resp) => {
          const gifs = GiffMapper.toGifList(resp);
          this.searchHistory.update((current) => ({
            ...current,
            [query.toLocaleLowerCase()]: gifs,
          }));
        })
      )
      .subscribe((resp) => {
        this.searchedGifs.set(GiffMapper.toGifList(resp));
        this.storage.set('searchHistory', JSON.stringify(this.searchHistory()));
        this.isLoading.set(false);
      });
  }

  getTrendingGifs(): void {
    this.isLoading.set(true);
    const params = new HttpParams().set('api_key', this.apiKey).set('limit', '30');

    this.http
      .get<GiphyTrendingResponse>(`${this.serviceUrl}/trending`, { params })
      .subscribe((resp) => {
        this.trendingGifs.set(GiffMapper.toGifList(resp));
        this.isLoading.set(false);
      });
  }

  loadMoreTrendingGifs(): void {
    if (this.isLoading()) return;
    this.isLoading.set(true);
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '30')
      .set('offset', this.trendingGifs().length.toString());
    this.http
      .get<GiphyTrendingResponse>(`${this.serviceUrl}/trending`, { params })
      .subscribe((resp) => {
        const moreGifs = GiffMapper.toGifList(resp);
        this.trendingGifs.update((current) => [...current, ...moreGifs]);
        this.isLoading.set(false);
      });
  }
}
