import { UserColorEnum, type UserColor } from './types';

function createColor(name: string, primary: string, secondary: string): UserColor {
	return { name, primary, secondary };
}

export const colorMap: Map<UserColorEnum, UserColor> = new Map();

colorMap.set(UserColorEnum.red, createColor('red', '#ef4444', '#991b1b'));
colorMap.set(UserColorEnum.orange, createColor('orange', '#f97316', '#9a3412'));
colorMap.set(UserColorEnum.yellow, createColor('yellow', '#fbbf24', '#b45309'));
colorMap.set(UserColorEnum.lime, createColor('lime', '#84cc16', '#3f6212'));
colorMap.set(UserColorEnum.green, createColor('green', '#15803d', '#14532d'));
colorMap.set(UserColorEnum.teal, createColor('teal', '#2dd4bf', '#0f766e'));
colorMap.set(UserColorEnum.brown, createColor('brown', '#713f12', '#451a03'));
colorMap.set(UserColorEnum.blue, createColor('blue', '#3b82f6', '#1e40af'));
colorMap.set(UserColorEnum.purple, createColor('purple', '#a855f7', '#6b21a8'));
colorMap.set(UserColorEnum.pink, createColor('pink', '#ec4899', '#9d174d'));
