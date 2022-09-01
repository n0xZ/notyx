import { defineConfig } from 'vite'

import React from '@vitejs/plugin-react'

import * as path from 'path'
export default defineConfig({
	plugins: [React()],
	resolve: {
		alias: {
			'@': path.resolve('src'),
		},
	},
})
