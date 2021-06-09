export function degressToRadians(angle: number) {
  return angle * (Math.PI / 180);
}

export function radiansToDegrees(angle: number) {
  return angle * (180 / Math.PI);
}

export function clamp(value: number, min: number, max: number) {
  if (value < min) {
    return min;
  }

  if (value > max) {
    return max;
  }

  return value;
}

export function distance(
  x1: number, y1: number,
  x2: number, y2: number,
) {
  return Math.sqrt(((x2 - x1) ** 2) + ((y2 - y1) ** 2));
}

// a = b
// c = x

export const proportion = (a: number, aResult: number, x: number) => (x * aResult) / a;
