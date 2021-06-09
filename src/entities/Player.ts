import { getCenterCoords } from '../utils/draw';
import { Colors } from '../constants/colors';

import { IKeyboardHandler } from './Keyboard';
import { GameContext } from '../@types/game';

export enum PlayerKeys {
  LEFT = 'a',
  RIGHT = 'd',
  UP = 'w',
  DOWN = 's',
}

export default class Player {
  public x = 0;

  public y = 0;

  public width = 8;

  public height = 8;

  public speed = 2;

  public rotationSpeed = 0.1;

  public deltaX = Math.cos(0);

  public deltaY = Math.sin(0);

  public angle = 0;

  public keyboardHandler: IKeyboardHandler;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  start() {
    const { speed, rotationSpeed } = this;

    const directionsHandlers = {
      [PlayerKeys.LEFT]: () => {
        const newAngle = this.angle - rotationSpeed;

        if (newAngle < 0) {
          this.angle += Math.PI * 2;
        } else {
          this.angle = newAngle;
        }
        this.deltaX = Math.cos(newAngle);
        this.deltaY = Math.sin(newAngle);
      },
      [PlayerKeys.RIGHT]: () => {
        const newAngle = this.angle + rotationSpeed;
        if (newAngle > Math.PI * 2) {
          this.angle -= Math.PI * 2;
        } else {
          this.angle = newAngle;
        }
        this.deltaX = Math.cos(newAngle);
        this.deltaY = Math.sin(newAngle);
      },
      [PlayerKeys.UP]: () => {
        this.x += this.deltaX * speed;
        this.y += this.deltaY * speed;
      },
      [PlayerKeys.DOWN]: () => {
        this.x -= this.deltaX * speed;
        this.y -= this.deltaY * speed;
      },
    };

    this.keyboardHandler = directionsHandlers;
  }

  update({ keyboard }: GameContext) {
    keyboard.handle(this.keyboardHandler);
  }

  draw({ miniMapContext }: GameContext) {
    const { x, y } = getCenterCoords(this.x, this.y, this.width, this.height);
    miniMapContext.fillStyle = Colors.PLAYER;
    miniMapContext.fillRect(x, y, this.width, this.height);

    miniMapContext.strokeStyle = Colors.PLAYER;
    miniMapContext.lineWidth = 2;
    miniMapContext.beginPath();
    miniMapContext.moveTo(this.x + this.deltaX * 20, this.y + this.deltaY * 20);
    miniMapContext.lineTo(this.x, this.y);
    miniMapContext.stroke();
    miniMapContext.closePath();
  }
}
