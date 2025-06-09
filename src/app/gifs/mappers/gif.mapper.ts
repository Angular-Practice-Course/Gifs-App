import type { GifItem } from '../interfaces/gif-response.interface';

export class GifMapper {
  static toEntity(gif: GifItem) {
    return {
      id: gif.id,
      title: gif.title,
      url: gif.images.original.url,
    };
  }

  static toEntities(gifs: GifItem[]) {
    return gifs.map(gif => this.toEntity(gif));
  }
}
