// svgStore.js
import { writable } from 'svelte/store';

export enum CoordinateType {
  moveto,
  lineto,
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
  path?: PathCoordinate[];
  stroke?: string;
  fill?: string;
  strokeWidth?: number;
  placement?: PlacementCoordinate;
}

export enum svgType {
  drawing,
}

export function pathToString(path: PathCoordinate[]) {
  return path.map((coordinate) => {
    if (coordinate.type === CoordinateType.moveto) {
      return `M${coordinate.x},${coordinate.y}`
    } else {
      return `L${coordinate.x},${coordinate.y}`
    }
  }).join("")
}

export const drawings = writable<Drawing[]>([]);

export function addDrawing(changes: Drawing) {
  $drawings = [
    ...$drawings,
    changes
  ]
}

export function modifyDrawing(index: number, changes: Drawing) {
  $drawings[index] = changes
}

export function deleteDrawing(index: number) {
  $drawings.splice(index, index)
}
