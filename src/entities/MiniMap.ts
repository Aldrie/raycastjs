import { Colors } from '../constants/colors';
import Map from './Map';

export default class MiniMap {
  private map: Map;

  constructor(map: Map) {
    this.map = map;
  }

  draw(context: CanvasRenderingContext2D) {
    const { map } = this;
    for (let row = 0; row < map.height; row++) {
      for (let col = 0; col < map.width; col++) {
        const nodeValue = map.matrix[row][col];
        const nodeColor = nodeValue === 1 ? Colors.WALL : 'transparent';

        const nodeX = col * map.size;
        const nodeY = row * map.size;
        const nodeSize = map.size;

        context.fillStyle = nodeColor;
        context.fillRect(nodeX, nodeY, nodeSize, nodeSize);
        context.strokeStyle = Colors.WALL_OUTLINE;
        context.lineWidth = 1;
        context.strokeRect(nodeX, nodeY, nodeSize, nodeSize);
      }
    }
  }
}
