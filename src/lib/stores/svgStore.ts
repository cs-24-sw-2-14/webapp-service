// svgStore.js
import { writable } from 'svelte/store';

// TODO: Change to CanvasCoordinates type.
export type Svg = {
  svg: string;
  x: number;
  y: number;
  commandId: number;
}

export const svgs = writable<Svg[]>([]);

