import { Color, type UserColor } from './types';

function createColor(name: string, primary: string, secondary: string): UserColor {
	return { name, primary, secondary };
}

export const colorMap: Map<Color, UserColor> = new Map();

colorMap.set(Color.red, createColor('red', '#ef4444', '#991b1b'));
colorMap.set(Color.orange, createColor('orange', '#f97316', '#9a3412'));
colorMap.set(Color.yellow, createColor('yellow', '#fbbf24', '#b45309'));
colorMap.set(Color.lime, createColor('lime', '#84cc16', '#3f6212'));
colorMap.set(Color.green, createColor('green', '#15803d', '#14532d'));
colorMap.set(Color.teal, createColor('teal', '#2dd4bf', '#0f766e'));
colorMap.set(Color.brown, createColor('brown', '#713f12', '#451a03'));
colorMap.set(Color.blue, createColor('blue', '#3b82f6', '#1e40af'));
colorMap.set(Color.purple, createColor('purple', '#a855f7', '#6b21a8'));
colorMap.set(Color.pink, createColor('pink', '#ec4899', '#9d174d'));
