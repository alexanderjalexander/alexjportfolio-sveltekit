/**
 * Exponentially eases out a number from 0 to 1. Clamped from 0 to 1.
 *
 * @param t a clamped float from 0 to 1.
 * @returns eased float from 0 to 1
 */
export function easeOutExpo(t: number) {
  const value = t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
  return Math.max(0, Math.min(1, value));
}
