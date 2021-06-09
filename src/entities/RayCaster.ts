import Map from './Map';
import Player from './Player';

import { GameContext } from '../@types/game';
import { degressToRadians, distance } from '../utils/math';

interface IRay {
  x: number;
  y: number;
  distance: number;
  angle: number;
  horizontal?: boolean;
}

export default class RayCaster {
  public player: Player;

  public rays: IRay[] = [];

  constructor(player: Player) {
    this.player = player;
  }

  private horizontalRay(map: Map, angle: number): Omit<IRay, 'angle'> {
    const { player } = this;

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

    return {
      x: nextX, y: nextY, distance: distance(player.x, player.y, nextX, nextY), horizontal: true,
    };
  }

  private verticalRay(map: Map, angle: number): Omit<IRay, 'angle'> {
    const { player } = this;

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

  update({ sceneContext, map }: GameContext) {
    const { player } = this;

    const rays = sceneContext.canvas.width;
    const fov = 60;
    let currentAngle = player.angle - degressToRadians(fov / 2);

    this.rays = [];

    for (let ray = 0; ray < rays; ray++) {
      const horizontal = this.horizontalRay(map, currentAngle);
      const vertical = this.verticalRay(map, currentAngle);
      const currentRay = horizontal.distance > vertical.distance ? vertical : horizontal;

      this.rays.push({ ...currentRay, angle: currentAngle });
      currentAngle += degressToRadians(fov / rays);
    }
  }
}
