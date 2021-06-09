import Stats from 'stats.js';

import Player from './entities/Player';
import Map from './entities/Map';
import Keyboard from './entities/Keyboard';
import Renderer from './entities/Renderer';

import { setupCanvases } from './utils/canvas';
import { GameContext } from './@types/game';

const mapNodeSize = 52;

setupCanvases(8 * mapNodeSize, 8 * mapNodeSize);

const scene = document.getElementById('scene') as HTMLCanvasElement;
const sceneContext = scene.getContext('2d');
const miniMapScene = document.getElementById('map') as HTMLCanvasElement;
const miniMapContext = miniMapScene.getContext('2d');

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

const player = new Player(map.size + 10, map.size * 6);
const keyboard = new Keyboard();
const renderer = new Renderer();

const gameContext: GameContext = {
  keyboard,
  miniMapContext,
  sceneContext,
  player,
  map,
};

function clearScene() {
  miniMapContext.clearRect(0, 0, miniMapScene.width, miniMapScene.height);
  sceneContext.clearRect(0, 0, scene.width, scene.height);
}

function start() {
  player.start();
  renderer.start(gameContext);
}

function update() {
  player.update(gameContext);
  renderer.update(gameContext);
}

function draw() {
  renderer.draw(gameContext);
  player.draw(miniMapContext);
}

const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);
stats.dom.style.cssText = 'position:absolute;top:0;right:0;';

function gameLoop() {
  stats.begin();
  update();
  clearScene();
  draw();
  stats.end();
  requestAnimationFrame(() => gameLoop());
}

start();
gameLoop();
