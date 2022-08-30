import React from 'react'
import ReactDOM from 'react-dom/client'
import { NhostReactProvider } from '@nhost/react'
import { NhostApolloProvider } from '@nhost/react-apollo'

import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AnimatePresence } from 'framer-motion'

import App from './App'
import { nhost } from './lib/nhost'

import './styles/tailwind.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<NhostReactProvider nhost={nhost}>
			<NhostApolloProvider nhost={nhost}>
				<AnimatePresence mode="wait">
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</AnimatePresence>
				<Toaster position="top-right" />
			</NhostApolloProvider>
		</NhostReactProvider>
	</React.StrictMode>
)
