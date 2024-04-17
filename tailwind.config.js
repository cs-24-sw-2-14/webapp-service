/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'mainRed': '#ef4444',
				'borderRed': '#991b1b',
				'mainOrange': '#f97316',
				'borderOrange': '#9a3412',
				'mainYellow': '#fbbf24',
				'borderYellow': '#b45309',
				'mainLime': '#84cc16',
				'borderLime': '#3f6212',
				'mainGreen': '#22c55e',
				'borderGreen': '#166534',
				'mainTeal': '#2dd4bf',
				'borderTeal': '#0f766e',
				'mainBrown': '#713f12',
				'borderBrown': '#451a03',
				'mainBlue': '#3b82f6',
				'borderBlue': '#1e40af',
				'mainPurple': '#a855f7',
				'borderPurple': '#6b21a8',
				'mainPink': '#ec4899',
				'borderPink': '#9d174d',
			},
		},
	},
	plugins: []
};
