import { defineConfig } from 'vite'
import Pages from 'vite-plugin-pages'
import React from '@vitejs/plugin-react'
import Unocss from 'unocss/vite'
import { presetAttributify, presetUno, presetWebFonts } from 'unocss'

import presetMini from '@unocss/preset-mini'
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
