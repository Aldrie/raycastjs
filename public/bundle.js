/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constants/colors.ts":
/*!*********************************!*\
  !*** ./src/constants/colors.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Colors\": () => (/* binding */ Colors)\n/* harmony export */ });\nlet Colors;\n\n(function (Colors) {\n  Colors[\"GRAY\"] = \"#333\";\n  Colors[\"PLAYER\"] = \"#e697c1\";\n  Colors[\"WALL\"] = \"#fcfcfc\";\n  Colors[\"WALL_OUTLINE\"] = \"#444\";\n  Colors[\"RAY\"] = \"#105c1f\";\n})(Colors || (Colors = {}));\n\n//# sourceURL=webpack://raycastjs/./src/constants/colors.ts?");

/***/ }),

/***/ "./src/entities/Keyboard.ts":
/*!**********************************!*\
  !*** ./src/entities/Keyboard.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Keyboard)\n/* harmony export */ });\nclass Keyboard {\n  pressedKeys = [];\n  handler = null;\n\n  addKey(key) {\n    this.pressedKeys.push(key);\n  }\n\n  removeKey(key) {\n    this.pressedKeys = this.pressedKeys.filter(currentKey => currentKey !== key);\n  }\n\n  constructor() {\n    window.addEventListener('keydown', event => {\n      const {\n        key\n      } = event;\n      this.addKey(key);\n    });\n    window.addEventListener('keyup', event => {\n      const {\n        key\n      } = event;\n      this.removeKey(key);\n    });\n  }\n\n  getKey(key) {\n    return !!this.pressedKeys.find(currentKey => currentKey === key);\n  }\n\n  setHandler(handler) {\n    this.handler = handler;\n  }\n\n  throwHandler() {\n    if (this.handler && this.pressedKeys.length > 0) {\n      const {\n        handler\n      } = this;\n      Object.keys(handler).forEach(key => {\n        if (this.getKey(key)) {\n          const func = handler[key];\n          func();\n        }\n      });\n    }\n  }\n\n}\n\n//# sourceURL=webpack://raycastjs/./src/entities/Keyboard.ts?");

/***/ }),

/***/ "./src/entities/Map.ts":
/*!*****************************!*\
  !*** ./src/entities/Map.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Map)\n/* harmony export */ });\nclass Map {\n  matrix = [];\n\n  constructor(width, height, size) {\n    this.width = width;\n    this.height = height;\n    this.size = size;\n  }\n\n  setMatrix(matrix) {\n    this.matrix = matrix;\n  }\n\n}\n\n//# sourceURL=webpack://raycastjs/./src/entities/Map.ts?");

/***/ }),

/***/ "./src/entities/MiniMap.ts":
/*!*********************************!*\
  !*** ./src/entities/MiniMap.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MiniMap)\n/* harmony export */ });\n/* harmony import */ var _constants_colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/colors */ \"./src/constants/colors.ts\");\n\nclass MiniMap {\n  constructor(map) {\n    this.map = map;\n  }\n\n  draw(context) {\n    const {\n      map\n    } = this;\n\n    for (let row = 0; row < map.height; row++) {\n      for (let col = 0; col < map.width; col++) {\n        const nodeValue = map.matrix[row][col];\n        const nodeColor = nodeValue === 1 ? _constants_colors__WEBPACK_IMPORTED_MODULE_0__.Colors.WALL : 'transparent';\n        const nodeX = col * map.size;\n        const nodeY = row * map.size;\n        const nodeSize = map.size;\n        context.fillStyle = nodeColor;\n        context.fillRect(nodeX, nodeY, nodeSize, nodeSize);\n        context.strokeStyle = _constants_colors__WEBPACK_IMPORTED_MODULE_0__.Colors.WALL_OUTLINE;\n        context.lineWidth = 1;\n        context.strokeRect(nodeX, nodeY, nodeSize, nodeSize);\n      }\n    }\n  }\n\n}\n\n//# sourceURL=webpack://raycastjs/./src/entities/MiniMap.ts?");

/***/ }),

/***/ "./src/entities/Player.ts":
/*!********************************!*\
  !*** ./src/entities/Player.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PlayerDirections\": () => (/* binding */ PlayerDirections),\n/* harmony export */   \"default\": () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _constants_colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/colors */ \"./src/constants/colors.ts\");\n/* harmony import */ var _utils_draw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/draw */ \"./src/utils/draw.ts\");\n\n\nlet PlayerDirections;\n\n(function (PlayerDirections) {\n  PlayerDirections[PlayerDirections[\"LEFT\"] = 0] = \"LEFT\";\n  PlayerDirections[PlayerDirections[\"RIGHT\"] = 1] = \"RIGHT\";\n  PlayerDirections[PlayerDirections[\"UP\"] = 2] = \"UP\";\n  PlayerDirections[PlayerDirections[\"DOWN\"] = 3] = \"DOWN\";\n})(PlayerDirections || (PlayerDirections = {}));\n\nclass Player {\n  x = 0;\n  y = 0;\n  width = 8;\n  height = 8;\n  speed = 2;\n  rotationSpeed = 0.1;\n  deltaX = Math.cos(0);\n  deltaY = Math.sin(0);\n  angle = 0;\n\n  constructor(x, y) {\n    this.x = x;\n    this.y = y;\n  }\n\n  move(direction) {\n    const {\n      speed,\n      rotationSpeed\n    } = this;\n    const directionsHandlers = {\n      [PlayerDirections.LEFT]: () => {\n        const newAngle = this.angle - rotationSpeed;\n\n        if (newAngle < 0) {\n          this.angle += Math.PI * 2;\n        } else {\n          this.angle = newAngle;\n        }\n\n        this.deltaX = Math.cos(newAngle);\n        this.deltaY = Math.sin(newAngle);\n      },\n      [PlayerDirections.RIGHT]: () => {\n        const newAngle = this.angle + rotationSpeed;\n\n        if (newAngle > Math.PI * 2) {\n          this.angle -= Math.PI * 2;\n        } else {\n          this.angle = newAngle;\n        }\n\n        this.deltaX = Math.cos(newAngle);\n        this.deltaY = Math.sin(newAngle);\n      },\n      [PlayerDirections.UP]: () => {\n        this.x += this.deltaX * speed;\n        this.y += this.deltaY * speed;\n      },\n      [PlayerDirections.DOWN]: () => {\n        this.x -= this.deltaX * speed;\n        this.y -= this.deltaY * speed;\n      }\n    };\n    const handler = directionsHandlers[direction];\n\n    if (handler) {\n      handler();\n    }\n  }\n\n  draw(context) {\n    const {\n      x,\n      y\n    } = (0,_utils_draw__WEBPACK_IMPORTED_MODULE_1__.getCenterCoords)(this.x, this.y, this.width, this.height);\n    context.fillStyle = _constants_colors__WEBPACK_IMPORTED_MODULE_0__.Colors.PLAYER;\n    context.fillRect(x, y, this.width, this.height);\n    context.strokeStyle = _constants_colors__WEBPACK_IMPORTED_MODULE_0__.Colors.PLAYER;\n    context.lineWidth = 2;\n    context.beginPath();\n    context.moveTo(this.x + this.deltaX * 20, this.y + this.deltaY * 20);\n    context.lineTo(this.x, this.y);\n    context.stroke();\n    context.closePath();\n  }\n\n}\n\n//# sourceURL=webpack://raycastjs/./src/entities/Player.ts?");

/***/ }),

/***/ "./src/entities/Rays.ts":
/*!******************************!*\
  !*** ./src/entities/Rays.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Rays)\n/* harmony export */ });\n/* harmony import */ var _constants_colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/colors */ \"./src/constants/colors.ts\");\n/* harmony import */ var _utils_math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/math */ \"./src/utils/math.ts\");\n/* eslint-disable no-param-reassign */\n\n/* eslint-disable no-bitwise */\n\n\nclass Rays {\n  constructor(player, map) {\n    this.player = player;\n    this.map = map;\n  }\n\n  horizontalRay(angle) {\n    const {\n      player,\n      map\n    } = this;\n    const rayAngle = angle;\n    const angleTan = Math.tan(rayAngle);\n    const up = Math.abs(Math.floor(rayAngle / Math.PI) % 2);\n    const firstYNormal = Math.floor(player.y / map.size) * map.size;\n    const firstY = up ? firstYNormal : firstYNormal + map.size;\n    const firstX = player.x + (firstY - player.y) / angleTan;\n    const yA = up ? -map.size : map.size;\n    const xA = yA / angleTan;\n    let wall;\n    let nextX = firstX;\n    let nextY = firstY;\n\n    while (!wall) {\n      const cellX = Math.floor(nextX / map.size);\n      const cellYNorm = Math.floor(nextY / map.size);\n      const cellY = up ? cellYNorm - 1 : cellYNorm;\n\n      if (cellX < 0 || cellX >= map.matrix[0].length || cellY < 0 || cellY >= map.matrix.length) {\n        break;\n      }\n\n      wall = map.matrix[cellY][cellX];\n\n      if (!wall) {\n        nextX += xA;\n        nextY += yA;\n      }\n    }\n\n    return {\n      x: nextX,\n      y: nextY,\n      distance: (0,_utils_math__WEBPACK_IMPORTED_MODULE_1__.distance)(player.x, player.y, nextX, nextY)\n    };\n  }\n\n  verticalRay(angle) {\n    const {\n      player,\n      map\n    } = this;\n    const rayAngle = angle;\n    const angleTan = Math.tan(rayAngle);\n    const right = Math.abs(Math.floor((rayAngle - Math.PI / 2) / Math.PI) % 2);\n    const firstXNormal = Math.floor(player.x / map.size) * map.size;\n    const firstX = right ? firstXNormal + map.size : firstXNormal;\n    const firstY = player.y + (firstX - player.x) * angleTan;\n    const xA = right ? map.size : -map.size;\n    const yA = xA * angleTan;\n    let wall;\n    let nextX = firstX;\n    let nextY = firstY;\n\n    while (!wall) {\n      const cellXNorm = Math.floor(nextX / map.size);\n      const cellX = right ? cellXNorm : cellXNorm - 1;\n      const cellY = Math.floor(nextY / map.size);\n\n      if (cellX < 0 || cellX >= map.matrix[0].length || cellY < 0 || cellY >= map.matrix.length || !map.matrix[cellY]) {\n        break;\n      }\n\n      wall = map.matrix[cellY][cellX];\n\n      if (!wall) {\n        nextX += xA;\n        nextY += yA;\n      }\n    }\n\n    return {\n      x: nextX,\n      y: nextY,\n      distance: (0,_utils_math__WEBPACK_IMPORTED_MODULE_1__.distance)(player.x, player.y, nextX, nextY)\n    };\n  }\n\n  draw(mapContext, sceneContext) {\n    const {\n      player,\n      map\n    } = this;\n    const rays = sceneContext.canvas.width;\n    const fov = 60;\n    let currentAngle = player.angle - (0,_utils_math__WEBPACK_IMPORTED_MODULE_1__.degressToRadians)(fov / 2);\n    const lineWidth = Math.floor(sceneContext.canvas.width / rays);\n\n    for (let ray = 0; ray < rays; ray++) {\n      const horizontal = this.horizontalRay(currentAngle);\n      const vertical = this.verticalRay(currentAngle);\n      const currentRay = horizontal.distance > vertical.distance ? vertical : horizontal;\n      let wallAlpha = 1 - currentRay.distance / 1000;\n\n      if (horizontal.distance < vertical.distance) {\n        wallAlpha -= 0.2;\n      }\n\n      mapContext.strokeStyle = _constants_colors__WEBPACK_IMPORTED_MODULE_0__.Colors.RAY;\n      mapContext.beginPath();\n      mapContext.lineWidth = 1;\n      mapContext.moveTo(player.x, player.y);\n      mapContext.lineTo(currentRay.x, currentRay.y);\n      mapContext.stroke();\n      mapContext.closePath(); // 3D ---\n\n      let cosAngle = player.angle - currentAngle;\n      if (cosAngle < 0) cosAngle += Math.PI * 2;\n      if (Math.PI * 2) cosAngle -= Math.PI * 2;\n      const normalizedDistance = currentRay.distance * Math.cos(cosAngle); // fish eye fix\n\n      const lineHeight = (0,_utils_math__WEBPACK_IMPORTED_MODULE_1__.clamp)(map.size * sceneContext.canvas.height / normalizedDistance, 0, sceneContext.canvas.height);\n      const lineOffset = sceneContext.canvas.height / 2 - lineHeight / 2;\n      sceneContext.fillStyle = _constants_colors__WEBPACK_IMPORTED_MODULE_0__.Colors.WALL;\n      sceneContext.globalAlpha = wallAlpha;\n      sceneContext.fillRect(ray * lineWidth, lineOffset, lineWidth, lineHeight);\n      currentAngle += (0,_utils_math__WEBPACK_IMPORTED_MODULE_1__.degressToRadians)(fov / rays);\n    }\n  }\n\n}\n\n//# sourceURL=webpack://raycastjs/./src/entities/Rays.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _entities_Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entities/Player */ \"./src/entities/Player.ts\");\n/* harmony import */ var _entities_Keyboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entities/Keyboard */ \"./src/entities/Keyboard.ts\");\n/* harmony import */ var _entities_Map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./entities/Map */ \"./src/entities/Map.ts\");\n/* harmony import */ var _utils_canvas__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/canvas */ \"./src/utils/canvas.ts\");\n/* harmony import */ var _entities_MiniMap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./entities/MiniMap */ \"./src/entities/MiniMap.ts\");\n/* harmony import */ var _entities_Rays__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./entities/Rays */ \"./src/entities/Rays.ts\");\n\n\n\n\n\n\nconst mapNodeSize = 52;\n(0,_utils_canvas__WEBPACK_IMPORTED_MODULE_3__.setupCanvases)(8 * mapNodeSize, 8 * mapNodeSize);\nconst scene = document.getElementById('scene');\nconst sceneContext = scene.getContext('2d');\nconst mapScene = document.getElementById('map');\nconst mapSceneContext = mapScene.getContext('2d');\nconst map = new _entities_Map__WEBPACK_IMPORTED_MODULE_2__.default(8, 8, mapNodeSize);\nmap.setMatrix([[1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 1, 0, 0, 0, 0, 1], [1, 0, 1, 0, 0, 0, 0, 1], [1, 0, 1, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 1, 0, 1], [1, 0, 0, 0, 0, 1, 0, 1], [1, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1]]);\nconst miniMap = new _entities_MiniMap__WEBPACK_IMPORTED_MODULE_4__.default(map);\nconst keyboard = new _entities_Keyboard__WEBPACK_IMPORTED_MODULE_1__.default();\nconst player = new _entities_Player__WEBPACK_IMPORTED_MODULE_0__.default(map.size + 10, map.size * 6);\nconst rays = new _entities_Rays__WEBPACK_IMPORTED_MODULE_5__.default(player, map);\n\nfunction setupKeyboard() {\n  const keyboardHandler = {\n    a: () => player.move(_entities_Player__WEBPACK_IMPORTED_MODULE_0__.PlayerDirections.LEFT),\n    d: () => player.move(_entities_Player__WEBPACK_IMPORTED_MODULE_0__.PlayerDirections.RIGHT),\n    w: () => player.move(_entities_Player__WEBPACK_IMPORTED_MODULE_0__.PlayerDirections.UP),\n    s: () => player.move(_entities_Player__WEBPACK_IMPORTED_MODULE_0__.PlayerDirections.DOWN)\n  };\n  keyboard.setHandler(keyboardHandler);\n}\n\nfunction movePlayer() {\n  keyboard.throwHandler();\n}\n\nfunction clearScene() {\n  mapSceneContext.clearRect(0, 0, mapScene.width, mapScene.height);\n  sceneContext.clearRect(0, 0, scene.width, scene.height);\n}\n\nfunction draw() {\n  miniMap.draw(mapSceneContext);\n  rays.draw(mapSceneContext, sceneContext);\n  player.draw(mapSceneContext);\n}\n\nfunction gameLoop() {\n  clearScene();\n  movePlayer();\n  draw();\n  requestAnimationFrame(() => gameLoop());\n}\n\nsetupKeyboard();\ngameLoop();\n\n//# sourceURL=webpack://raycastjs/./src/index.ts?");

/***/ }),

/***/ "./src/utils/canvas.ts":
/*!*****************************!*\
  !*** ./src/utils/canvas.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"setupCanvases\": () => (/* binding */ setupCanvases)\n/* harmony export */ });\n/* eslint-disable no-unused-vars */\nfunction resizeCanvas(canvasId, width, height) {\n  const canvas = document.getElementById(canvasId);\n  canvas.width = width;\n  canvas.height = height;\n}\n\nfunction handleWindowResize() {\n  const {\n    innerWidth,\n    innerHeight\n  } = window;\n  resizeCanvas('scene', innerWidth, innerHeight);\n}\n\nfunction setupCanvases(mapWidth, mapHeight) {\n  // handleWindowResize();\n  // window.addEventListener('resize', handleWindowResize);\n  resizeCanvas('map', mapWidth, mapHeight);\n  resizeCanvas('scene', 1024, 950);\n}\n\n//# sourceURL=webpack://raycastjs/./src/utils/canvas.ts?");

/***/ }),

/***/ "./src/utils/draw.ts":
/*!***************************!*\
  !*** ./src/utils/draw.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getCenterCoords\": () => (/* binding */ getCenterCoords)\n/* harmony export */ });\nfunction getCenterCoords(x, y, width, height) {\n  return {\n    x: x - width / 2,\n    y: y - height / 2\n  };\n}\n\n//# sourceURL=webpack://raycastjs/./src/utils/draw.ts?");

/***/ }),

/***/ "./src/utils/math.ts":
/*!***************************!*\
  !*** ./src/utils/math.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"degressToRadians\": () => (/* binding */ degressToRadians),\n/* harmony export */   \"radiansToDegrees\": () => (/* binding */ radiansToDegrees),\n/* harmony export */   \"clamp\": () => (/* binding */ clamp),\n/* harmony export */   \"distance\": () => (/* binding */ distance)\n/* harmony export */ });\nfunction degressToRadians(angle) {\n  return angle * (Math.PI / 180);\n}\nfunction radiansToDegrees(angle) {\n  return angle * (180 / Math.PI);\n}\nfunction clamp(value, min, max) {\n  if (value < min) {\n    return min;\n  }\n\n  if (value > max) {\n    return max;\n  }\n\n  return value;\n}\nfunction distance(x1, y1, x2, y2) {\n  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);\n}\n\n//# sourceURL=webpack://raycastjs/./src/utils/math.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;