import config from '../config';
const { TRACTOR_DATA } = config;
import type { CarRequest } from '@ts-interfaces';

const MAX_RANGE_ADJUSTMENT = 1;

export function getRandom(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + MAX_RANGE_ADJUSTMENT)) + min;
}

const DARK = 0;
const LIGHT = 255;

export function getRandomColor(): string {
  return `rgb(${getRandom(DARK, LIGHT)} ${getRandom(DARK, LIGHT)} ${getRandom(DARK, LIGHT)})`;
}

const FIRST_ITEM = 0;
const INDEX_OFFSET = 1;

export function getRandomRacer(): CarRequest {
  const brands = Object.keys(TRACTOR_DATA) as Array<keyof typeof TRACTOR_DATA>;
  const brand = brands[getRandom(FIRST_ITEM, brands.length - INDEX_OFFSET)];
  const models = TRACTOR_DATA[brand];
  const model = models[getRandom(FIRST_ITEM, models.length - INDEX_OFFSET)];
  const color = getRandomColor();
  return { name: `${brand} ${model}`, color };
}
