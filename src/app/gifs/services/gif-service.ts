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

  constructor() {
    this.getTrendingGifs();
  }

  private readonly domain = environment.giphyDomain;
  private readonly endpoint = '/v1/gifs/trending';

  private readonly options = {
    api_key: environment.giphyApiKey,
    rating: 'g',
    bundle: 'messaging_non_clips',
    limit: '25',
    offset: '0',
  };

  getTrendingGifs() {
    this.http
      .get<GifResponse>(`${this.domain}${this.endpoint}`, {
        params: this.options,
      })
      .subscribe(data => {
        this.trendingGifs.set(GifMapper.toEntities(data.data));
      });
  }
}
