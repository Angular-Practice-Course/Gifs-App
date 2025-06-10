import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import type { GifEntity } from '../interfaces/gif-entity.interface';
import type { GifResponse } from '../interfaces/gif-response.interface';
import { GifMapper } from '../mappers/gif.mapper';

@Injectable({
  providedIn: 'root',
})
export class GifService {
  private readonly http = inject(HttpClient);

  trendingGifs = signal<GifEntity[]>([]);
  searchedGifs = signal<GifEntity[]>([]);

  constructor() {
    this.getTrendingGifs();
  }

  private readonly domain = environment.giphyDomain;

  getTrendingGifs() {
    const endpoint = '/v1/gifs/trending';

    const options = {
      api_key: environment.giphyApiKey,
      rating: 'g',
      bundle: 'messaging_non_clips',
      limit: '25',
      offset: '0',
    };

    this.http
      .get<GifResponse>(`${this.domain}${endpoint}`, {
        params: options,
      })
      .subscribe(data => {
        this.trendingGifs.set(
          GifMapper.toEntities(data.data).filter(
            (gif, index, self) => index === self.findIndex(g => g.id === gif.id)
          )
        );
        console.log('Trending GIFs fetched:', this.trendingGifs());
      });
  }

  searchGifs(query: string) {
    const endpoint = '/v1/gifs/search';

    const options = {
      api_key: environment.giphyApiKey,
      rating: 'g',
      bundle: 'messaging_non_clips',
      limit: '25',
      offset: '0',
      lang: 'es',
      q: query,
    };

    this.http
      .get<GifResponse>(`${this.domain}${endpoint}`, {
        params: options,
      })
      .subscribe(data => {
        this.searchedGifs.set(
          GifMapper.toEntities(data.data).filter(
            (gif, index, self) => index === self.findIndex(g => g.id === gif.id)
          )
        );
        console.log(`Searched GIFs for "${query}":`, this.searchedGifs());
      });
  }
}
