import { defineConfig } from 'vite'
import Pages from 'vite-plugin-pages'
import React from '@vitejs/plugin-react'
import Unocss from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'
import presetWebFonts from '@unocss/preset-web-fonts'
import presetMini from '@unocss/preset-mini'
import presetIcons from '@unocss/preset-icons'
import * as path from 'path'
export default defineConfig({
	plugins: [
		React(),
		Pages(),
		Unocss({
			presets: [
				presetAttributify(),
				presetUno(),
				presetMini({ dark: 'class' }),
				presetIcons(),
				presetWebFonts({
					provider: 'bunny',
					fonts: {
						inter: 'Inter',
						lato: [
							{
								name: 'Lato',
								weights: ['400', '700'],
								italic: true,
							},
							{
								name: 'sans-serif',
								provider: 'none',
							},
						],
					},
				}),
			],
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve('src'),
		},
	},
})
