import { Colors } from '../constants/colors';
import { getCenterCoords } from '../utils/draw';

export enum PlayerDirections {
  LEFT = 0,
  RIGHT = 1,
  UP = 2,
  DOWN = 3,
}

export default class Player {
  public x = 0;

  public y = 0;

  public width = 8 ;

  public height = 8 ;

  public speed = 2;

  public rotationSpeed = 0.1;

  public deltaX = Math.cos(0);

  public deltaY = Math.sin(0);

  public angle = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  move(direction: PlayerDirections) {
    const { speed, rotationSpeed } = this;

    const directionsHandlers = {
      [PlayerDirections.LEFT]: () => {
        const newAngle = this.angle - rotationSpeed;

        if (newAngle < 0) {
          this.angle += Math.PI * 2;
        } else {
          this.angle = newAngle;
        }
        this.deltaX = Math.cos(newAngle);
        this.deltaY = Math.sin(newAngle);
      },
      [PlayerDirections.RIGHT]: () => {
        const newAngle = this.angle + rotationSpeed;
        if (newAngle > Math.PI * 2) {
          this.angle -= Math.PI * 2;
        } else {
          this.angle = newAngle;
        }
        this.deltaX = Math.cos(newAngle);
        this.deltaY = Math.sin(newAngle);
      },
      [PlayerDirections.UP]: () => {
        this.x += this.deltaX * speed;
        this.y += this.deltaY * speed;
      },
      [PlayerDirections.DOWN]: () => {
        this.x -= this.deltaX * speed;
        this.y -= this.deltaY * speed;
      },
    };

    const handler = directionsHandlers[direction];

    if (handler) {
      handler();
    }
  }

  draw(context: CanvasRenderingContext2D) {
    const { x, y } = getCenterCoords(this.x, this.y, this.width, this.height);
    context.fillStyle = Colors.PLAYER;
    context.fillRect(x, y, this.width, this.height);

    context.strokeStyle = Colors.PLAYER;
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(this.x + this.deltaX * 20, this.y + this.deltaY * 20);
    context.lineTo(this.x, this.y);
    context.stroke();
    context.closePath();
  }
}
