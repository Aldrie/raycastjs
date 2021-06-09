import RayCaster from './RayCaster';

import { clamp } from '../utils/math';

import { GameContext } from '../@types/game';
import { Colors } from '../constants/colors';

export default class Renderer {
  public raycaster: RayCaster;

  start({ player, sceneContext }: GameContext) {
    const raysCount = Math.floor(sceneContext.canvas.width / 2);
    this.raycaster = new RayCaster(player, raysCount);
  }

  update(context: GameContext) {
    this.raycaster.update(context);
  }

  private drawMiniMap({ miniMapContext, player, map }: GameContext) {
    const nodeSize = Math.floor(miniMapContext.canvas.width / map.height);

    // grid
    for (let row = 0; row < map.height; row++) {
      for (let col = 0; col < map.width; col++) {
        const nodeValue = map.matrix[row][col];
        const nodeColor = nodeValue === 1 ? Colors.WALL : 'transparent';

        const nodeX = col * nodeSize;
        const nodeY = row * nodeSize;

        miniMapContext.fillStyle = nodeColor;
        miniMapContext.fillRect(nodeX, nodeY, nodeSize, nodeSize);
        miniMapContext.strokeStyle = Colors.WALL_OUTLINE;
        miniMapContext.lineWidth = 1;
        miniMapContext.strokeRect(nodeX, nodeY, nodeSize, nodeSize);
      }
    }
    // rays
    for (const ray of this.raycaster.rays) {
      miniMapContext.strokeStyle = Colors.RAY;
      miniMapContext.beginPath();
      miniMapContext.lineWidth = 1;
      miniMapContext.moveTo(player.x, player.y);
      miniMapContext.lineTo(ray.x, ray.y);
      miniMapContext.stroke();
      miniMapContext.closePath();
    }
  }

  draw(context: GameContext) {
    const { sceneContext, map, player } = context;
    const { rays } = this.raycaster;

    const lineWidth = Math.floor(sceneContext.canvas.width / rays.length);

    // walls
    for (let ray = 0; ray < rays.length; ray++) {
      const currentRay = rays[ray];

      // shading start
      const lightDepth = 750;
      let wallAlpha = 1 - (clamp(currentRay.distance, 0, lightDepth) / (lightDepth * 2));

      if (!currentRay?.horizontal) {
        wallAlpha -= 0.2;
      }

      // shading end

      let cosAngle = player.angle - currentRay.angle;
      if (cosAngle < 0) cosAngle += Math.PI * 2;
      if (Math.PI * 2) cosAngle -= Math.PI * 2;

      const normalizedDistance = currentRay.distance * Math.cos(cosAngle); // fish eye fix

      const lineHeight = clamp(
        (map.size * sceneContext.canvas.height) / normalizedDistance,
        0, sceneContext.canvas.height,
      );

      const lineOffset = (sceneContext.canvas.height / 2) - (lineHeight / 2);

      sceneContext.fillStyle = Colors.WALL;
      sceneContext.globalAlpha = wallAlpha;
      sceneContext.fillRect(ray * lineWidth, lineOffset, lineWidth, lineHeight);
    }

    // minimap
    this.drawMiniMap(context);
  }
}
