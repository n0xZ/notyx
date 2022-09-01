import { AnimatePresence } from 'framer-motion'
import { Suspense, lazy } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import GlobalLoading from './components/loading/GlobalLoading'

const Landing = lazy(() => import('./pages/index'))
const Login = lazy(() => import('./pages/login'))
const Register = lazy(() => import('./pages/register'))
const HomeOutlet = lazy(() => import('./pages/home'))
const HomeGeneral = lazy(() => import('./pages/home/general'))
const Profile = lazy(() => import('./pages/home/profile'))
const CollectionsOutlet = lazy(() => import('./pages/home/collections'))
const DynamicCollections = lazy(
	() => import('./pages/home/collections/[collectionId]')
)

function App() {
	const location = useLocation()

	return (
		<AnimatePresence mode="wait" key={location.pathname}>
			<Suspense fallback={<GlobalLoading />}>
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/home" element={<HomeOutlet />}>
						<Route path="general" element={<HomeGeneral />} />

						<Route path="profile" element={<Profile />} />
						<Route path="collections" element={<CollectionsOutlet />}>
							<Route path=":collectionId" element={<DynamicCollections />} />
						</Route>
					</Route>
				</Routes>
			</Suspense>
		</AnimatePresence>
	)
}

export default App
