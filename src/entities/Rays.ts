/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */
import { Colors } from '../constants/colors';
import { clamp, degressToRadians, distance } from '../utils/math';
import Map from './Map';
import Player from './Player';

export default class Rays {
  public player: Player;

  public map: Map;

  constructor(player: Player, map: Map) {
    this.player = player;
    this.map = map;
  }

  private horizontalRay(angle: number) {
    const { player, map } = this;

    const rayAngle = angle;

    const angleTan = Math.tan(rayAngle);
    const up = Math.abs(Math.floor(rayAngle / Math.PI) % 2);

    const firstYNormal = Math.floor(player.y / map.size) * map.size;

    const firstY = up ? firstYNormal : firstYNormal + map.size;

    const firstX = player.x + (firstY - player.y) / angleTan;

    const yA = up ? -map.size : map.size;
    const xA = yA / angleTan;

    let wall: number;
    let nextX = firstX;
    let nextY = firstY;

    while (!wall) {
      const cellX = Math.floor(nextX / map.size);
      const cellYNorm = Math.floor(nextY / map.size);
      const cellY = up ? cellYNorm - 1 : cellYNorm;

      if (cellX < 0 || cellX >= map.matrix[0].length || cellY < 0 || cellY >= map.matrix.length) {
        break;
      }

      wall = map.matrix[cellY][cellX];

      if (!wall) {
        nextX += xA;
        nextY += yA;
      }
    }

    return { x: nextX, y: nextY, distance: distance(player.x, player.y, nextX, nextY) };
  }

  private verticalRay(angle: number) {
    const { player, map } = this;

    const rayAngle = angle;

    const angleTan = Math.tan(rayAngle);
    const right = Math.abs(Math.floor((rayAngle - Math.PI / 2) / Math.PI) % 2);

    const firstXNormal = Math.floor(player.x / map.size) * map.size;

    const firstX = right ? firstXNormal + map.size : firstXNormal;

    const firstY = player.y + (firstX - player.x) * angleTan;

    const xA = right ? map.size : -map.size;
    const yA = xA * angleTan;

    let wall: number;
    let nextX = firstX;
    let nextY = firstY;

    while (!wall) {
      const cellXNorm = Math.floor(nextX / map.size);
      const cellX = right ? cellXNorm : cellXNorm - 1;

      const cellY = Math.floor(nextY / map.size);

      if (
        (cellX < 0 || cellX >= map.matrix[0].length || cellY < 0 || cellY >= map.matrix.length)
      || !map.matrix[cellY]
      ) {
        break;
      }

      wall = map.matrix[cellY][cellX];

      if (!wall) {
        nextX += xA;
        nextY += yA;
      }
    }
    return { x: nextX, y: nextY, distance: distance(player.x, player.y, nextX, nextY) };
  }

  draw(mapContext: CanvasRenderingContext2D, sceneContext: CanvasRenderingContext2D) {
    const { player, map } = this;

    const rays = sceneContext.canvas.width;
    const fov = 60;
    let currentAngle = player.angle - degressToRadians(fov / 2);

    const lineWidth = Math.floor(sceneContext.canvas.width / rays);

    for (let ray = 0; ray < rays; ray++) {
      const horizontal = this.horizontalRay(currentAngle);
      const vertical = this.verticalRay(currentAngle);
      const currentRay = horizontal.distance > vertical.distance ? vertical : horizontal;

      let wallAlpha = 1 - (currentRay.distance / 1000);

      if (horizontal.distance < vertical.distance) {
        wallAlpha -= 0.2;
      }
      mapContext.strokeStyle = Colors.RAY;
      mapContext.beginPath();
      mapContext.lineWidth = 1;
      mapContext.moveTo(player.x, player.y);
      mapContext.lineTo(currentRay.x, currentRay.y);
      mapContext.stroke();
      mapContext.closePath();

      // 3D ---

      let cosAngle = player.angle - currentAngle;
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
      currentAngle += degressToRadians(fov / rays);
    }
  }
}
