import { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
export const LandingLayout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<header className="p-5  outline-2 outline-amber">
				<nav className="flex flex-row items-center justify-between container mx-auto max-w-6xl">
					<ul className="flex flex-row items-center">
						<li>
							<NavLink to="/login">Iniciar sesión</NavLink>
						</li>
						<li>
							<NavLink to="/register">Unete ya!</NavLink>
						</li>
					</ul>
				</nav>
			</header>
			<main className="min-h-screen h-full "> {children}</main>
		</>
	)
}
export default function NoteLanding() {
	return (
		<LandingLayout>
			<section className="grid place-items-center ">
				<h1>Crea tus notas de manera personalizada.</h1>
				<NavLink to="/login">Empezar ya</NavLink>
				<NavLink to="/about">Qué es Notyx?</NavLink>
			</section>
		</LandingLayout>
	)
}
