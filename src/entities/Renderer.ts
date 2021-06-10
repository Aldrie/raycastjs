import RayCaster from './RayCaster';

import { clamp, proportion } from '../utils/math';

import { GameContext } from '../@types/game';
import { Colors } from '../constants/colors';
import { getCenterCoords } from '../utils/draw';

export default class Renderer {
  public raycaster: RayCaster;

  start({ player, sceneContext }: GameContext) {
    const raysCount = Math.floor(sceneContext.canvas.width / 2);
    this.raycaster = new RayCaster(player, raysCount);
  }

  update(context: GameContext) {
    this.raycaster.update(context);
  }

  private drawMiniMap(context: GameContext) {
    const { miniMapContext, player, map } = context;
    const nodeSize = Math.floor(miniMapContext.canvas.width / map.height);

    const getAdjustedValue = (value: number) => Math.floor((value / map.size) * nodeSize);

    // player correct coords
    const playerX = getAdjustedValue(player.x);
    const playerY = getAdjustedValue(player.y);
    const playerWidth = getAdjustedValue(player.width);
    const playerHeight = getAdjustedValue(player.height);
    const playerDirectionRayLength = getAdjustedValue(50);

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
      const rayX = getAdjustedValue(ray.x);
      const rayY = getAdjustedValue(ray.y);

      miniMapContext.strokeStyle = Colors.RAY;
      miniMapContext.beginPath();
      miniMapContext.lineWidth = 1;
      miniMapContext.moveTo(playerX + (playerWidth / 2), playerY + (playerHeight / 2));
      miniMapContext.lineTo(rayX, rayY);
      miniMapContext.stroke();
      miniMapContext.closePath();
    }

    // draw player
    miniMapContext.fillStyle = Colors.PLAYER;
    miniMapContext.fillRect(playerX, playerY, playerWidth, playerHeight);

    // player direction line
    miniMapContext.strokeStyle = Colors.PLAYER;
    miniMapContext.lineWidth = 2;
    miniMapContext.beginPath();
    miniMapContext.moveTo(playerX + (playerWidth / 2), playerY + (playerHeight / 2));
    miniMapContext.lineTo(
      playerX + player.deltaX * playerDirectionRayLength,
      playerY + player.deltaY * playerDirectionRayLength,
    );
    miniMapContext.stroke();
    miniMapContext.closePath();
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
