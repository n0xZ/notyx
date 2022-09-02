import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import LoadingAvatar from './LoadingAvatar'

const transitionVariants = {
	initial: {
		opacity: 0,
		y: 8,
	},
	enter: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.4,
			ease: [0.61, 1, 0.88, 1],
		},
	},
}
export default function HomeLoading() {
	return (
		<>
			<header className="p-3 bg-rose-100 sticky top-0 h-19 w-full">
				<nav className="flex flex-row items-center justify-between container mx-auto max-w-6xl">
					<NavLink to="/home/main" className="h-6 w-6">
						Home
					</NavLink>
					<LoadingAvatar />
				</nav>
			</header>

			<motion.main
				initial="initial"
				animate="enter"
				variants={transitionVariants}
				className="h-full grid place-items-center"
			>
				<p>Cargando colecciones.</p>
			</motion.main>
		</>
	)
}
