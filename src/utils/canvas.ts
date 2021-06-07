/* eslint-disable no-unused-vars */
function resizeCanvas(canvasId: string, width: number, height: number) {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  canvas.width = width;
  canvas.height = height;
}

function handleWindowResize() {
  const { innerWidth, innerHeight } = window;
  resizeCanvas('scene', innerWidth, innerHeight);
}

export function setupCanvases(mapWidth: number, mapHeight: number) {
  // handleWindowResize();
  // window.addEventListener('resize', handleWindowResize);
  resizeCanvas('map', mapWidth, mapHeight);
  resizeCanvas('scene', 1024, 950);
}
