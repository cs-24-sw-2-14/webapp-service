// svgStore.js
import { writable } from 'svelte/store';

export interface Svg {
  svg: string;
  x: number;
  y: number;
}

export enum CoordinateType {
  start,
  middle,
  end,
}

export interface PathCoordinate {
  type: CoordinateType;
  x: number;
  y: number;
}

export interface PlacementCoordinate {
  x: number;
  y: number;
}

export interface Drawing {
  path: PathCoordinate[];
  stroke: string;
  fill: string;
  strokeWidth: number;
  placement: PlacementCoordinate;

}

export const drawings = writable<Drawing[]>([
]);
