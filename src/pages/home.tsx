import { useAuthenticationStatus, useSignOut } from '@nhost/react'
import { Navigate, NavLink, Outlet } from 'react-router-dom'

export default function HomeOutlet() {
	const { isLoading, isAuthenticated } = useAuthenticationStatus()
	const { signOut } = useSignOut()

	if (!isAuthenticated && !isLoading)
		return <Navigate to="/login" replace={true} />
	return (
		<>
			<header className="p-5 BG-rose-200">
				<nav className="flex flex-row items-center justify-between container mx-auto max-w-6xl">
					<NavLink to="/home/main"> </NavLink>
					<ul className="flex flex-row space-x-3">
						<li>
							<NavLink to="/home/profile">Mi perfil</NavLink>
						</li>
						<li>
							<button onClick={signOut}>Cerrar sesión</button>
						</li>
					</ul>
				</nav>
			</header>
			<main className="h-screen ">{isLoading ? 'Cargando...' : <Outlet />}</main>
		</>
	)
}
