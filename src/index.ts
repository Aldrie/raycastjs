import Stats from 'stats.js';

import Player from './entities/Player';
import Keyboard from './entities/Keyboard';
import Renderer from './entities/Renderer';

import { setupCanvases } from './utils/canvas';
import { GameContext } from './@types/game';
import { getMap } from './maps/main';

const mapNodeSize = 52;

setupCanvases(mapNodeSize * 16, mapNodeSize * 16);

const scene = document.getElementById('scene') as HTMLCanvasElement;
const sceneContext = scene.getContext('2d');
const miniMapScene = document.getElementById('map') as HTMLCanvasElement;
const miniMapContext = miniMapScene.getContext('2d');

const map = getMap(mapNodeSize);

const player = new Player(mapNodeSize * 2, mapNodeSize * 2);
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
  player.draw(gameContext);
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
