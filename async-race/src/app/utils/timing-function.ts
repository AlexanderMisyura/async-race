export function easeInQuad(timeFraction: number): number {
  const POW_TWO = 2;
  return Math.pow(timeFraction, POW_TWO);
}
