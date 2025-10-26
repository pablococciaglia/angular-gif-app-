import { Gif } from '../interfaces/gif.interface';
import { GiphyTrendingResponse } from '../interfaces/giphyTrendingResponse.interface';

export class GiffMapper {
  static toGifList(giphyResponse: GiphyTrendingResponse): Gif[] {
    return giphyResponse.data.map((gifData) => ({
      id: gifData.id,
      title: gifData.title,
      url: gifData.images.original.url,
      width: parseInt(gifData.images.fixed_height.width, 10),
      height: parseInt(gifData.images.fixed_height.height, 10),
    }));
  }
}
