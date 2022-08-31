import { AnimatePresence } from 'framer-motion'
import { Suspense } from 'react'
import { useLocation, useRoutes } from 'react-router-dom'
import routes from '~react-pages'
import GlobalLoading from './components/loading/GlobalLoading'

function App() {
	const location = useLocation()
	return (
		<AnimatePresence mode="wait" key={location.pathname}>
			<Suspense fallback={<GlobalLoading />}>{useRoutes(routes)}</Suspense>
		</AnimatePresence>
	)
}

export default App
