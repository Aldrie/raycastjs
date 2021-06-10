function resizeCanvas(canvasId: string, width: number, height: number) {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  canvas.width = width;
  canvas.height = height;
}

function handleWindowResize() {
  const { innerWidth, innerHeight } = window;
  resizeCanvas('scene', innerWidth, innerHeight);
}

interface ISetupCanvasesOptions {
  miniMap: {
    width: number,
    height: number,
  }
}

export function setupCanvases({ miniMap }: ISetupCanvasesOptions) {
  // handleWindowResize();
  // window.addEventListener('resize', handleWindowResize);
  resizeCanvas('map', miniMap.width, miniMap.height);
  resizeCanvas('scene', 1024, 950);
}
