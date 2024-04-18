// svgStore.js
import { writable } from 'svelte/store';

export interface Svg {
  svg: string;
  x: number;
  y: number;
}

export const svgs = writable<Svg[]>([]);
