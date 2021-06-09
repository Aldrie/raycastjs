import Keyboard from '../entities/Keyboard';
import Player from '../entities/Player';
import Map from '../entities/Map';

export interface GameContext {
  miniMapContext: CanvasRenderingContext2D;
  sceneContext: CanvasRenderingContext2D;
  keyboard: Keyboard;
  player: Player;
  map: Map;
}
