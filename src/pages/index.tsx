import { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
export const LandingLayout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<header className="p-5  outline-2 outline-amber">
				<nav className="flex flex-row items-center justify-between container mx-auto max-w-6xl">
					<NavLink to="/">Notyx</NavLink>
					<ul className="flex flex-row items-center space-x-5">
						<li>
							<NavLink to="/login">Iniciar sesión</NavLink>
						</li>
						<li>
							<NavLink to="/register">Unete ya!</NavLink>
						</li>
					</ul>
				</nav>
			</header>
			<main className="min-h-screen h-screen "> {children}</main>
		</>
	)
}
export default function NoteLanding() {
	return (
		<LandingLayout>
			<section className="grid place-items-center h-full">
				<article className="flex flex-col justify-center space-y-3 text-center">
					<h1>Crea tus notas de manera personalizada.</h1>
					<NavLink to="/login">Empezar ya</NavLink>
					<NavLink to="/about">Qué es Notyx?</NavLink>
				</article>
			</section>
		</LandingLayout>
	)
}
