/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./index.html',
		'./src/**/*.tsx',
		,
		'./src/pages/**/*.tsx',
		,
		'./src/components/**/*.tsx',
	],
	theme: {
		extend: {
			fontFamily: {
				firaSans: ['Fira Sans', 'sans-serif'],
				inter: ['Inter', 'sans-serif'],
				lato: ['Lato', 'sans-serif'],
			},
		},
	},
	plugins: [],
}
