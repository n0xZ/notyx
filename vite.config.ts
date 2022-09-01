/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

import React from '@vitejs/plugin-react'

import * as path from 'path'
export default defineConfig({
	plugins: [React()],
	resolve: {
		alias: {
			'@': path.resolve('src'),
		},
	},
	test: {
		globals: true,
		environment: 'jsdom',
	},
})
