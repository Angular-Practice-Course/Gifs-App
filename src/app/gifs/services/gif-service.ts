import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { map, tap } from 'rxjs';
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

  searchRecord = signal<Record<string, GifEntity[]>>(
    JSON.parse(localStorage.getItem('gifSearchRecord') || '{}')
  );

  searchRecordKeys = computed(() => {
    localStorage.setItem(
      'gifSearchRecord',
      JSON.stringify(this.searchRecord())
    );

    return Object.keys(this.searchRecord());
  });

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
      .pipe(
        map(({ data }) =>
          GifMapper.toEntities(data).filter(
            (gif, index, self) => index === self.findIndex(g => g.id === gif.id)
          )
        )
      )
      .pipe(
        tap(gifs => {
          this.searchRecord.update(record => ({
            [query.trim().toLowerCase()]: gifs,
            ...record,
          }));
        })
      )
      .subscribe(data => {
        this.searchedGifs.set(data);
        console.log(`Searched GIFs for "${query}":`, this.searchedGifs());
      });
  }
}
