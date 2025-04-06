import config from '../config';
const { ADJECTIVES, NOUNS } = config;
import type { CarRequest } from '@ts-interfaces';

const MAX_RANGE_ADJUSTMENT = 1;
const HEX_LENGTH = 6;
const INDEX_OFFSET = 1;
const FIRST_ITEM = 0;

export function getRandom(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + MAX_RANGE_ADJUSTMENT)) + min;
}

export function getRandomHexColor(): string {
  const letters = [...'0123456789ABCDEF'];
  let color = '#';

  for (let index = 0; index < HEX_LENGTH; index++) {
    color +=
      letters[Math.round(Math.random() * (letters.length - INDEX_OFFSET))];
  }

  return color;
}

export function getRandomRacer(): CarRequest {
  const name = getRandomName();
  const color = getRandomHexColor();
  return { name, color };
}

export function getRandomName(): string {
  const adjective =
    ADJECTIVES[getRandom(FIRST_ITEM, ADJECTIVES.length - INDEX_OFFSET)];
  const noun = NOUNS[getRandom(FIRST_ITEM, NOUNS.length - INDEX_OFFSET)];

  return `${adjective} ${noun}`;
}
