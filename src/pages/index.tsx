import { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
export const LandingLayout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<header className="p-3   bg-rose-100 ">
				<nav className="flex flex-row items-center justify-between container mx-auto max-w-6xl font-bold">
					<NavLink to="/" className={({ isActive }) => (isActive ? '' : '')}>
						Notyx
					</NavLink>
					<ul className="flex flex-row items-center space-x-5 hidden xl:sticky">
						<li>
							<NavLink to="/about">Sobre Notyx</NavLink>
						</li>
						<li>
							<NavLink to="/login">Iniciar sesión</NavLink>
						</li>
						<li>
							<NavLink to="/register">Unete ya!</NavLink>
						</li>
					</ul>
				</nav>
			</header>
			<motion.main className="min-h-screen h-screen "> {children}</motion.main>
		</>
	)
}
export default function NoteLanding() {
	return (
		<LandingLayout>
			<section className="grid place-items-center h-full bg-rose-100">
				<article className="flex flex-col justify-center space-y-4 text-center">
					<h1 className="xl:text-4xl text-2xl mb-2">
						Crea tus notas de manera personalizada
					</h1>
					<p>
						En Notyx puedes crear tus apuntes personales, para que olvides de tus
						tareas establecidas!
					</p>
					<aside className="flex flex-row space-x-3 justify-center items-center mt-2">
						<NavLink
							to="/login"
							className="px-5 py-4 bg-rose-300 rounded-xl text-neutral-50"
							title="Comienza ya en Notyx"
						>
							Empezar ya
						</NavLink>
						<NavLink
							to="/about"
							className="bg-neutral-100 px-5 py-4 rounded-xl "
							title="Acerca de Notyx"
						>
							Qué es Notyx?
						</NavLink>
					</aside>
				</article>
			</section>

			{/* <section className="grid place-items-center h-screen">
				<article className="flex flex-col justify-center space-y-3 text-center">
					<h1 className="text-3xl">Crea tus notas de manera personalizada.</h1>
					<aside className="flex flex-row space-x-3 justify-center items-center">
						<NavLink
							to="/login"
							className="px-5 py-4 bg-rose-300 rounded-xl text-neutral-100"
						>
							Comienza ya
						</NavLink>
						<NavLink to="/about" className="bg-neutral-50 px-5 py-3 rounded-xl">
							Qué es Notyx?
						</NavLink>
					</aside>
				</article>
			</section> */}
		</LandingLayout>
	)
}
