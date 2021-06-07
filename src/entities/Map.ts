export default class Map {
  public width: number;

  public height: number;

  public size: number;

  public matrix: number[][] = [];

  constructor(width: number, height: number, size: number) {
    this.width = width;
    this.height = height;
    this.size = size;
  }

  setMatrix(matrix: number[][]) {
    this.matrix = matrix;
  }
}
