import Player, { PlayerDirections } from './entities/Player';
import Keyboard from './entities/Keyboard';
import Map from './entities/Map';

import { setupCanvases } from './utils/canvas';
import MiniMap from './entities/MiniMap';
import Rays from './entities/Rays';

const mapNodeSize = 52;

setupCanvases(8 * mapNodeSize, 8 * mapNodeSize);

const scene = document.getElementById('scene') as HTMLCanvasElement;
const sceneContext = scene.getContext('2d');
const mapScene = document.getElementById('map') as HTMLCanvasElement;
const mapSceneContext = mapScene.getContext('2d');

const map = new Map(8, 8, mapNodeSize);

map.setMatrix([
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
]);

const miniMap = new MiniMap(map);
const keyboard = new Keyboard();
const player = new Player(map.size + 10, map.size * 6);
const rays = new Rays(player, map);

function setupKeyboard() {
  const keyboardHandler = {
    a: () => player.move(PlayerDirections.LEFT),
    d: () => player.move(PlayerDirections.RIGHT),
    w: () => player.move(PlayerDirections.UP),
    s: () => player.move(PlayerDirections.DOWN),
  };

  keyboard.setHandler(keyboardHandler);
}

function movePlayer() {
  keyboard.throwHandler();
}

function clearScene() {
  mapSceneContext.clearRect(0, 0, mapScene.width, mapScene.height);
  sceneContext.clearRect(0, 0, scene.width, scene.height);
}

function draw() {
  miniMap.draw(mapSceneContext);
  rays.draw(mapSceneContext, sceneContext);
  player.draw(mapSceneContext);
}

function gameLoop() {
  clearScene();
  movePlayer();
  draw();
  requestAnimationFrame(() => gameLoop());
}

setupKeyboard();
gameLoop();
