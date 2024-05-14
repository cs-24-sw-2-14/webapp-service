// svgStore.js
import { writable } from 'svelte/store';
import type { Svg } from '$lib/types';

export const svgs = writable<Svg[]>([]);
