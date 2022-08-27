import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'

import 'uno.css'
import '@unocss/reset/tailwind.css'
import { AnimatePresence } from 'framer-motion'
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<AnimatePresence mode="wait">
					<App />
				</AnimatePresence>
			</BrowserRouter>
			<Toaster position="top-right" />
		</QueryClientProvider>
	</React.StrictMode>
)
