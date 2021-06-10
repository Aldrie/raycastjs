export default class Map {
  public width: number;

  public height: number;

  public size = 52;

  public matrix: number[][] = [];

  constructor(matrix: number[][]) {
    this.matrix = matrix;

    this.width = matrix[0].length;
    this.height = matrix.length;
  }
}
