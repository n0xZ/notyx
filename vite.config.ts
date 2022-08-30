import { defineConfig } from 'vite'
import Pages from 'vite-plugin-pages'
import React from '@vitejs/plugin-react'

import * as path from 'path'
export default defineConfig({
	plugins: [React(), Pages()],
	resolve: {
		alias: {
			'@': path.resolve('src'),
		},
	},
})
