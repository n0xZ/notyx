import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function HomeOutlet() {
	return (
		<>
			<header className="p-5 ">
				<nav className="flex flex-row items-center justify-between container mx-auto max-w-6xl">
					<ul className="flex flex-row">
						<li>
							<NavLink to="/home/profile">Mi perfil</NavLink>
						</li>
						<li>
							<button>Cerrar sesión</button>
						</li>
					</ul>
				</nav>
			</header>
			<main className="h-screen ">
				<Outlet />
			</main>
		</>
	)
}
