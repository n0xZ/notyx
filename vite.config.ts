import { defineConfig } from 'vite'
import Pages from 'vite-plugin-pages'
import React from '@vitejs/plugin-react'
import Unocss from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'
import * as path from 'path'
export default defineConfig({
	plugins: [
		React(),
		Pages(),
		Unocss({ presets: [presetAttributify(), presetUno()] }),
	],
	resolve: {
		alias: {
			'@': path.resolve('src'),
		},
	},
})
