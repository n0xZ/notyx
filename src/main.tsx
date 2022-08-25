import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import App from './App'
import store from '@/redux/store'
import 'uno.css'
import '@unocss/reset/tailwind.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
			<Toaster position="top-right" />
		</Provider>
	</React.StrictMode>
)
