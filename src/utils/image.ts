export const getImageAsync = (src:string): Promise<HTMLImageElement> => new Promise(
  (resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  },
);

export const getPixels = async (image: HTMLImageElement): Promise<number[][][]> => {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;

  const context = canvas.getContext('2d');
  context.drawImage(image, 0, 0, image.width, image.height);

  const { data } = context.getImageData(0, 0, image.width, image.height);

  const pixelArray = [];

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    pixelArray.push([r, g, b]);
  }

  const pixelMatrix = [];

  for (let row = 0; row < image.width; row++) {
    const range = image.width * row;
    pixelMatrix.push(pixelArray.slice(range, range + image.width));
  }

  canvas.remove();
  return pixelMatrix;
};
