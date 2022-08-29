import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from '~react-pages'
import GlobalLoading from './components/loading/GlobalLoading'

function App() {
	return <Suspense fallback={<GlobalLoading />}>{useRoutes(routes)}</Suspense>
}

export default App
