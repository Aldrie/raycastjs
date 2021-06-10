import Stats from 'stats.js';

import Player from './entities/Player';
import Keyboard from './entities/Keyboard';
import Renderer from './entities/Renderer';

import { setupCanvases } from './utils/canvas';
import { GameContext } from './@types/game';
import { mainMap } from './maps/main';

setupCanvases({
  miniMap: { width: 200, height: 200 },
});

const scene = document.getElementById('scene') as HTMLCanvasElement;
const sceneContext = scene.getContext('2d');
const miniMapScene = document.getElementById('map') as HTMLCanvasElement;
const miniMapContext = miniMapScene.getContext('2d');

const player = new Player(52, 52);
const keyboard = new Keyboard();
const renderer = new Renderer();

const gameContext: GameContext = {
  keyboard,
  miniMapContext,
  sceneContext,
  player,
  map: mainMap,
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
