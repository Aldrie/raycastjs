export function getCenterCoords(x: number, y: number, width: number, height: number) {
  return {
    x: x - (width / 2),
    y: y - (height / 2),
  };
}
