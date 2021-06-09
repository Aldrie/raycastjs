/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constants/colors.ts":
/*!*********************************!*\
  !*** ./src/constants/colors.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Colors\": () => (/* binding */ Colors)\n/* harmony export */ });\nlet Colors;\n\n(function (Colors) {\n  Colors[\"GRAY\"] = \"#333\";\n  Colors[\"PLAYER\"] = \"#e697c1\";\n  Colors[\"WALL\"] = \"#fcfcfc\";\n  Colors[\"WALL_OUTLINE\"] = \"#444\";\n  Colors[\"RAY\"] = \"#105c1f\";\n  Colors[\"FPS\"] = \"#f1f1f1\";\n})(Colors || (Colors = {}));\n\n//# sourceURL=webpack://raycastjs/./src/constants/colors.ts?");

/***/ }),

/***/ "./src/entities/Keyboard.ts":
/*!**********************************!*\
  !*** ./src/entities/Keyboard.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Keyboard)\n/* harmony export */ });\nclass Keyboard {\n  pressedKeys = [];\n\n  addKey(key) {\n    const code = key.charCodeAt(0);\n\n    if (this.pressedKeys.indexOf(code) === -1) {\n      this.pressedKeys.push(code);\n    }\n  }\n\n  removeKey(key) {\n    this.pressedKeys = this.pressedKeys.filter(currentKey => currentKey !== key.charCodeAt(0));\n  }\n\n  constructor() {\n    window.addEventListener('keydown', event => {\n      const {\n        key\n      } = event;\n      this.addKey(key);\n    });\n    window.addEventListener('keyup', event => {\n      const {\n        key\n      } = event;\n      this.removeKey(key);\n    });\n  }\n\n  getKey(key) {\n    return !!this.pressedKeys.find(currentKey => currentKey === key.charCodeAt(0));\n  }\n\n  handle(handler) {\n    if (handler && this.pressedKeys.length > 0) {\n      const keys = Object.keys(handler).filter(key => this.getKey(key));\n\n      if (keys.length <= 0) {\n        return;\n      }\n\n      keys.forEach(key => {\n        if (this.getKey(key)) {\n          const func = handler[key];\n          func();\n        }\n      });\n    }\n  }\n\n}\n\n//# sourceURL=webpack://raycastjs/./src/entities/Keyboard.ts?");

/***/ }),

/***/ "./src/entities/Map.ts":
/*!*****************************!*\
  !*** ./src/entities/Map.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Map)\n/* harmony export */ });\nclass Map {\n  matrix = [];\n\n  constructor(width, height, size) {\n    this.width = width;\n    this.height = height;\n    this.size = size;\n  }\n\n  setMatrix(matrix) {\n    this.matrix = matrix;\n  }\n\n}\n\n//# sourceURL=webpack://raycastjs/./src/entities/Map.ts?");

/***/ }),

/***/ "./src/entities/Player.ts":
/*!********************************!*\
  !*** ./src/entities/Player.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PlayerKeys\": () => (/* binding */ PlayerKeys),\n/* harmony export */   \"default\": () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _utils_draw__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/draw */ \"./src/utils/draw.ts\");\n/* harmony import */ var _constants_colors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/colors */ \"./src/constants/colors.ts\");\n\n\nlet PlayerKeys;\n\n(function (PlayerKeys) {\n  PlayerKeys[\"LEFT\"] = \"a\";\n  PlayerKeys[\"RIGHT\"] = \"d\";\n  PlayerKeys[\"UP\"] = \"w\";\n  PlayerKeys[\"DOWN\"] = \"s\";\n})(PlayerKeys || (PlayerKeys = {}));\n\nclass Player {\n  x = 0;\n  y = 0;\n  width = 8;\n  height = 8;\n  speed = 2;\n  rotationSpeed = 0.1;\n  deltaX = Math.cos(0);\n  deltaY = Math.sin(0);\n  angle = 0;\n\n  constructor(x, y) {\n    this.x = x;\n    this.y = y;\n  }\n\n  start() {\n    const {\n      speed,\n      rotationSpeed\n    } = this;\n    const directionsHandlers = {\n      [PlayerKeys.LEFT]: () => {\n        const newAngle = this.angle - rotationSpeed;\n\n        if (newAngle < 0) {\n          this.angle += Math.PI * 2;\n        } else {\n          this.angle = newAngle;\n        }\n\n        this.deltaX = Math.cos(newAngle);\n        this.deltaY = Math.sin(newAngle);\n      },\n      [PlayerKeys.RIGHT]: () => {\n        const newAngle = this.angle + rotationSpeed;\n\n        if (newAngle > Math.PI * 2) {\n          this.angle -= Math.PI * 2;\n        } else {\n          this.angle = newAngle;\n        }\n\n        this.deltaX = Math.cos(newAngle);\n        this.deltaY = Math.sin(newAngle);\n      },\n      [PlayerKeys.UP]: () => {\n        this.x += this.deltaX * speed;\n        this.y += this.deltaY * speed;\n      },\n      [PlayerKeys.DOWN]: () => {\n        this.x -= this.deltaX * speed;\n        this.y -= this.deltaY * speed;\n      }\n    };\n    this.keyboardHandler = directionsHandlers;\n  }\n\n  update({\n    keyboard\n  }) {\n    keyboard.handle(this.keyboardHandler);\n  }\n\n  draw(context) {\n    const {\n      x,\n      y\n    } = (0,_utils_draw__WEBPACK_IMPORTED_MODULE_0__.getCenterCoords)(this.x, this.y, this.width, this.height);\n    context.fillStyle = _constants_colors__WEBPACK_IMPORTED_MODULE_1__.Colors.PLAYER;\n    context.fillRect(x, y, this.width, this.height);\n    context.strokeStyle = _constants_colors__WEBPACK_IMPORTED_MODULE_1__.Colors.PLAYER;\n    context.lineWidth = 2;\n    context.beginPath();\n    context.moveTo(this.x + this.deltaX * 20, this.y + this.deltaY * 20);\n    context.lineTo(this.x, this.y);\n    context.stroke();\n    context.closePath();\n  }\n\n}\n\n//# sourceURL=webpack://raycastjs/./src/entities/Player.ts?");

/***/ }),

/***/ "./src/entities/RayCaster.ts":
/*!***********************************!*\
  !*** ./src/entities/RayCaster.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ RayCaster)\n/* harmony export */ });\n/* harmony import */ var _utils_math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/math */ \"./src/utils/math.ts\");\n\nclass RayCaster {\n  rays = [];\n\n  constructor(player) {\n    this.player = player;\n  }\n\n  horizontalRay(map, angle) {\n    const {\n      player\n    } = this;\n    const rayAngle = angle;\n    const angleTan = Math.tan(rayAngle);\n    const up = Math.abs(Math.floor(rayAngle / Math.PI) % 2);\n    const firstYNormal = Math.floor(player.y / map.size) * map.size;\n    const firstY = up ? firstYNormal : firstYNormal + map.size;\n    const firstX = player.x + (firstY - player.y) / angleTan;\n    const yA = up ? -map.size : map.size;\n    const xA = yA / angleTan;\n    let wall;\n    let nextX = firstX;\n    let nextY = firstY;\n\n    while (!wall) {\n      const cellX = Math.floor(nextX / map.size);\n      const cellYNorm = Math.floor(nextY / map.size);\n      const cellY = up ? cellYNorm - 1 : cellYNorm;\n\n      if (cellX < 0 || cellX >= map.matrix[0].length || cellY < 0 || cellY >= map.matrix.length) {\n        break;\n      }\n\n      wall = map.matrix[cellY][cellX];\n\n      if (!wall) {\n        nextX += xA;\n        nextY += yA;\n      }\n    }\n\n    return {\n      x: nextX,\n      y: nextY,\n      distance: (0,_utils_math__WEBPACK_IMPORTED_MODULE_0__.distance)(player.x, player.y, nextX, nextY),\n      horizontal: true\n    };\n  }\n\n  verticalRay(map, angle) {\n    const {\n      player\n    } = this;\n    const rayAngle = angle;\n    const angleTan = Math.tan(rayAngle);\n    const right = Math.abs(Math.floor((rayAngle - Math.PI / 2) / Math.PI) % 2);\n    const firstXNormal = Math.floor(player.x / map.size) * map.size;\n    const firstX = right ? firstXNormal + map.size : firstXNormal;\n    const firstY = player.y + (firstX - player.x) * angleTan;\n    const xA = right ? map.size : -map.size;\n    const yA = xA * angleTan;\n    let wall;\n    let nextX = firstX;\n    let nextY = firstY;\n\n    while (!wall) {\n      const cellXNorm = Math.floor(nextX / map.size);\n      const cellX = right ? cellXNorm : cellXNorm - 1;\n      const cellY = Math.floor(nextY / map.size);\n\n      if (cellX < 0 || cellX >= map.matrix[0].length || cellY < 0 || cellY >= map.matrix.length || !map.matrix[cellY]) {\n        break;\n      }\n\n      wall = map.matrix[cellY][cellX];\n\n      if (!wall) {\n        nextX += xA;\n        nextY += yA;\n      }\n    }\n\n    return {\n      x: nextX,\n      y: nextY,\n      distance: (0,_utils_math__WEBPACK_IMPORTED_MODULE_0__.distance)(player.x, player.y, nextX, nextY)\n    };\n  }\n\n  update({\n    sceneContext,\n    map\n  }) {\n    const {\n      player\n    } = this;\n    const rays = sceneContext.canvas.width;\n    const fov = 60;\n    let currentAngle = player.angle - (0,_utils_math__WEBPACK_IMPORTED_MODULE_0__.degressToRadians)(fov / 2);\n    this.rays = [];\n\n    for (let ray = 0; ray < rays; ray++) {\n      const horizontal = this.horizontalRay(map, currentAngle);\n      const vertical = this.verticalRay(map, currentAngle);\n      const currentRay = horizontal.distance > vertical.distance ? vertical : horizontal;\n      this.rays.push({ ...currentRay,\n        angle: currentAngle\n      });\n      currentAngle += (0,_utils_math__WEBPACK_IMPORTED_MODULE_0__.degressToRadians)(fov / rays);\n    }\n  }\n\n}\n\n//# sourceURL=webpack://raycastjs/./src/entities/RayCaster.ts?");

/***/ }),

/***/ "./src/entities/Renderer.ts":
/*!**********************************!*\
  !*** ./src/entities/Renderer.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Renderer)\n/* harmony export */ });\n/* harmony import */ var _RayCaster__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RayCaster */ \"./src/entities/RayCaster.ts\");\n/* harmony import */ var _utils_math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/math */ \"./src/utils/math.ts\");\n/* harmony import */ var _constants_colors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/colors */ \"./src/constants/colors.ts\");\n\n\n\nclass Renderer {\n  start({\n    player\n  }) {\n    this.raycaster = new _RayCaster__WEBPACK_IMPORTED_MODULE_0__.default(player);\n  }\n\n  update(context) {\n    this.raycaster.update(context);\n  }\n\n  drawMiniMap({\n    miniMapContext,\n    player,\n    map\n  }) {\n    // grid\n    for (let row = 0; row < map.height; row++) {\n      for (let col = 0; col < map.width; col++) {\n        const nodeValue = map.matrix[row][col];\n        const nodeColor = nodeValue === 1 ? _constants_colors__WEBPACK_IMPORTED_MODULE_2__.Colors.WALL : 'transparent';\n        const nodeX = col * map.size;\n        const nodeY = row * map.size;\n        const nodeSize = map.size;\n        miniMapContext.fillStyle = nodeColor;\n        miniMapContext.fillRect(nodeX, nodeY, nodeSize, nodeSize);\n        miniMapContext.strokeStyle = _constants_colors__WEBPACK_IMPORTED_MODULE_2__.Colors.WALL_OUTLINE;\n        miniMapContext.lineWidth = 1;\n        miniMapContext.strokeRect(nodeX, nodeY, nodeSize, nodeSize);\n      }\n    } // rays\n\n\n    for (const ray of this.raycaster.rays) {\n      miniMapContext.strokeStyle = _constants_colors__WEBPACK_IMPORTED_MODULE_2__.Colors.RAY;\n      miniMapContext.beginPath();\n      miniMapContext.lineWidth = 1;\n      miniMapContext.moveTo(player.x, player.y);\n      miniMapContext.lineTo(ray.x, ray.y);\n      miniMapContext.stroke();\n      miniMapContext.closePath();\n    }\n  }\n\n  draw(context) {\n    const {\n      sceneContext,\n      map,\n      player\n    } = context;\n    const {\n      rays\n    } = this.raycaster;\n    const lineWidth = Math.floor(sceneContext.canvas.width / rays.length); // walls\n\n    for (let ray = 0; ray < rays.length; ray++) {\n      const currentRay = rays[ray]; // shading start\n\n      let wallAlpha = 1 - currentRay.distance / 1000;\n\n      if (!currentRay?.horizontal) {\n        wallAlpha -= 0.2;\n      } // shading end\n\n\n      let cosAngle = player.angle - currentRay.angle;\n      if (cosAngle < 0) cosAngle += Math.PI * 2;\n      if (Math.PI * 2) cosAngle -= Math.PI * 2;\n      const normalizedDistance = currentRay.distance * Math.cos(cosAngle); // fish eye fix\n\n      const lineHeight = (0,_utils_math__WEBPACK_IMPORTED_MODULE_1__.clamp)(map.size * sceneContext.canvas.height / normalizedDistance, 0, sceneContext.canvas.height);\n      const lineOffset = sceneContext.canvas.height / 2 - lineHeight / 2;\n      sceneContext.fillStyle = _constants_colors__WEBPACK_IMPORTED_MODULE_2__.Colors.WALL;\n      sceneContext.globalAlpha = wallAlpha;\n      sceneContext.fillRect(ray * lineWidth, lineOffset, lineWidth, lineHeight);\n    } // minimap\n\n\n    this.drawMiniMap(context);\n  }\n\n}\n\n//# sourceURL=webpack://raycastjs/./src/entities/Renderer.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var stats_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! stats.js */ \"./node_modules/stats.js/build/stats.min.js\");\n/* harmony import */ var stats_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(stats_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _entities_Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entities/Player */ \"./src/entities/Player.ts\");\n/* harmony import */ var _entities_Map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./entities/Map */ \"./src/entities/Map.ts\");\n/* harmony import */ var _entities_Keyboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./entities/Keyboard */ \"./src/entities/Keyboard.ts\");\n/* harmony import */ var _entities_Renderer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./entities/Renderer */ \"./src/entities/Renderer.ts\");\n/* harmony import */ var _utils_canvas__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/canvas */ \"./src/utils/canvas.ts\");\n\n\n\n\n\n\nconst mapNodeSize = 52;\n(0,_utils_canvas__WEBPACK_IMPORTED_MODULE_5__.setupCanvases)(8 * mapNodeSize, 8 * mapNodeSize);\nconst scene = document.getElementById('scene');\nconst sceneContext = scene.getContext('2d');\nconst miniMapScene = document.getElementById('map');\nconst miniMapContext = miniMapScene.getContext('2d');\nconst map = new _entities_Map__WEBPACK_IMPORTED_MODULE_2__.default(8, 8, mapNodeSize);\nmap.setMatrix([[1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 1, 0, 0, 0, 0, 1], [1, 0, 1, 0, 0, 0, 0, 1], [1, 0, 1, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 1, 0, 1], [1, 0, 0, 0, 0, 1, 0, 1], [1, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1]]);\nconst player = new _entities_Player__WEBPACK_IMPORTED_MODULE_1__.default(map.size + 10, map.size * 6);\nconst keyboard = new _entities_Keyboard__WEBPACK_IMPORTED_MODULE_3__.default();\nconst renderer = new _entities_Renderer__WEBPACK_IMPORTED_MODULE_4__.default();\nconst gameContext = {\n  keyboard,\n  miniMapContext,\n  sceneContext,\n  player,\n  map\n};\n\nfunction clearScene() {\n  miniMapContext.clearRect(0, 0, miniMapScene.width, miniMapScene.height);\n  sceneContext.clearRect(0, 0, scene.width, scene.height);\n}\n\nfunction start() {\n  player.start();\n  renderer.start(gameContext);\n}\n\nfunction update() {\n  player.update(gameContext);\n  renderer.update(gameContext);\n}\n\nfunction draw() {\n  renderer.draw(gameContext);\n  player.draw(miniMapContext);\n}\n\nconst stats = new (stats_js__WEBPACK_IMPORTED_MODULE_0___default())();\nstats.showPanel(0);\ndocument.body.appendChild(stats.dom);\nstats.dom.style.cssText = 'position:absolute;top:0;right:0;';\n\nfunction gameLoop() {\n  stats.begin();\n  update();\n  clearScene();\n  draw();\n  stats.end();\n  requestAnimationFrame(() => gameLoop());\n}\n\nstart();\ngameLoop();\n\n//# sourceURL=webpack://raycastjs/./src/index.ts?");

/***/ }),

/***/ "./src/utils/canvas.ts":
/*!*****************************!*\
  !*** ./src/utils/canvas.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"setupCanvases\": () => (/* binding */ setupCanvases)\n/* harmony export */ });\nfunction resizeCanvas(canvasId, width, height) {\n  const canvas = document.getElementById(canvasId);\n  canvas.width = width;\n  canvas.height = height;\n}\n\nfunction handleWindowResize() {\n  const {\n    innerWidth,\n    innerHeight\n  } = window;\n  resizeCanvas('scene', innerWidth, innerHeight);\n}\n\nfunction setupCanvases(mapWidth, mapHeight) {\n  // handleWindowResize();\n  // window.addEventListener('resize', handleWindowResize);\n  resizeCanvas('map', mapWidth, mapHeight);\n  resizeCanvas('scene', 1024, 950);\n}\n\n//# sourceURL=webpack://raycastjs/./src/utils/canvas.ts?");

/***/ }),

/***/ "./src/utils/draw.ts":
/*!***************************!*\
  !*** ./src/utils/draw.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getCenterCoords\": () => (/* binding */ getCenterCoords)\n/* harmony export */ });\nfunction getCenterCoords(x, y, width, height) {\n  return {\n    x: x - width / 2,\n    y: y - height / 2\n  };\n}\n\n//# sourceURL=webpack://raycastjs/./src/utils/draw.ts?");

/***/ }),

/***/ "./src/utils/math.ts":
/*!***************************!*\
  !*** ./src/utils/math.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"degressToRadians\": () => (/* binding */ degressToRadians),\n/* harmony export */   \"radiansToDegrees\": () => (/* binding */ radiansToDegrees),\n/* harmony export */   \"clamp\": () => (/* binding */ clamp),\n/* harmony export */   \"distance\": () => (/* binding */ distance)\n/* harmony export */ });\nfunction degressToRadians(angle) {\n  return angle * (Math.PI / 180);\n}\nfunction radiansToDegrees(angle) {\n  return angle * (180 / Math.PI);\n}\nfunction clamp(value, min, max) {\n  if (value < min) {\n    return min;\n  }\n\n  if (value > max) {\n    return max;\n  }\n\n  return value;\n}\nfunction distance(x1, y1, x2, y2) {\n  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);\n}\n\n//# sourceURL=webpack://raycastjs/./src/utils/math.ts?");

/***/ }),

/***/ "./node_modules/stats.js/build/stats.min.js":
/*!**************************************************!*\
  !*** ./node_modules/stats.js/build/stats.min.js ***!
  \**************************************************/
/***/ (function(module) {

eval("// stats.js - http://github.com/mrdoob/stats.js\n(function(f,e){ true?module.exports=e():0})(this,function(){var f=function(){function e(a){c.appendChild(a.dom);return a}function u(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?\"block\":\"none\";l=a}var l=0,c=document.createElement(\"div\");c.style.cssText=\"position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000\";c.addEventListener(\"click\",function(a){a.preventDefault();\nu(++l%c.children.length)},!1);var k=(performance||Date).now(),g=k,a=0,r=e(new f.Panel(\"FPS\",\"#0ff\",\"#002\")),h=e(new f.Panel(\"MS\",\"#0f0\",\"#020\"));if(self.performance&&self.performance.memory)var t=e(new f.Panel(\"MB\",\"#f08\",\"#201\"));u(0);return{REVISION:16,dom:c,addPanel:e,showPanel:u,begin:function(){k=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();h.update(c-k,200);if(c>g+1E3&&(r.update(1E3*a/(c-g),100),g=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/\n1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){k=this.end()},domElement:c,setMode:u}};f.Panel=function(e,f,l){var c=Infinity,k=0,g=Math.round,a=g(window.devicePixelRatio||1),r=80*a,h=48*a,t=3*a,v=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement(\"canvas\");q.width=r;q.height=h;q.style.cssText=\"width:80px;height:48px\";var b=q.getContext(\"2d\");b.font=\"bold \"+9*a+\"px Helvetica,Arial,sans-serif\";b.textBaseline=\"top\";b.fillStyle=l;b.fillRect(0,0,r,h);b.fillStyle=f;b.fillText(e,t,v);\nb.fillRect(d,m,n,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d,m,n,p);return{dom:q,update:function(h,w){c=Math.min(c,h);k=Math.max(k,h);b.fillStyle=l;b.globalAlpha=1;b.fillRect(0,0,r,m);b.fillStyle=f;b.fillText(g(h)+\" \"+e+\" (\"+g(c)+\"-\"+g(k)+\")\",t,v);b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p);b.fillRect(d+n-a,m,a,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d+n-a,m,a,g((1-h/w)*p))}}};return f});\n\n\n//# sourceURL=webpack://raycastjs/./node_modules/stats.js/build/stats.min.js?");

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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