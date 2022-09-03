import { AnimatePresence } from 'framer-motion'
import { Suspense, lazy } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import HomeLoading from '@/components/loading/HomeLoading'
import LoadingNotes from '@/components/loading/LoadingNotes'
import CollectionsLoading from './components/loading/CollectionsLoading'

const Landing = lazy(() => import('./pages/index'))
const Login = lazy(() => import('./pages/login'))
const Register = lazy(() => import('./pages/register'))
const HomeOutlet = lazy(() => import('./pages/home'))
const HomeGeneral = lazy(() => import('./pages/home/general'))

const CollectionsOutlet = lazy(() => import('./pages/home/collections'))
const CollectionsHome = lazy(() => import('./pages/home/collections/general'))
const DynamicCollections = lazy(
	() => import('./pages/home/collections/[collectionId]')
)

function App() {
	const location = useLocation()

	return (
		<AnimatePresence mode="wait" key={location.pathname}>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route
					path="/login"
					element={
						<Suspense fallback={<div>Cargando formulario de login...</div>}>
							<Login />
						</Suspense>
					}
				/>
				<Route
					path="/register"
					element={
						<Suspense fallback={<div>Cargando formulario de login...</div>}>
							<Register />
						</Suspense>
					}
				/>
				<Route
					path="/home"
					element={
						<Suspense fallback={<HomeLoading />}>
							<HomeOutlet />
						</Suspense>
					}
				>
					<Route
						path="general"
						element={
							<Suspense fallback={<HomeGeneral />}>
								<HomeGeneral />
							</Suspense>
						}
					/>

					<Route
						path="collections"
						element={
							<Suspense fallback={<CollectionsLoading />}>
								<CollectionsOutlet />
							</Suspense>
						}
					>
						<Route path="" element={<CollectionsHome />} />
						<Route
							path=":collectionId"
							element={
								<Suspense fallback={<LoadingNotes />}>
									<DynamicCollections />
								</Suspense>
							}
						/>
					</Route>
				</Route>
			</Routes>
		</AnimatePresence>
	)
}

export default App
