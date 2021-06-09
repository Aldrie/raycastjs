import { getImageAsync, getPixels } from '../utils/image';

export default class Texture {
  public pixels: number[][][] = [];

  async loadImage(src: string) {
    const image = await getImageAsync(src);

    this.pixels = await getPixels(image);
  }
}
