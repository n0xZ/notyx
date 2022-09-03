import { Navigate, NavLink, Outlet } from 'react-router-dom'
import { useAuthenticationStatus, useSignOut, useUserData } from '@nhost/react'
import { Icon } from '@iconify/react'
import { Menu, Transition } from '@headlessui/react'
import { motion } from 'framer-motion'
import { Fragment } from 'react'
import LoadingAvatar from '@/components/loading/LoadingAvatar'

type AvatarProps = {
	user: ReturnType<typeof useUserData>
}
export const Avatar = ({ user }: AvatarProps) => {
	const { signOut } = useSignOut()
	return (
		<Menu as="div" className="relative inline-block text-left">
			<div>
				<Menu.Button className=" w-full justify-center rounded-md    text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
					<img
						src={user?.avatarUrl}
						alt={`${user?.displayName} image`}
						className="rounded-full w-12 h-12"
					/>
				</Menu.Button>
			</div>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="absolute right-0 mt-2 w-60 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
					<div className="px-1 py-1 ">
						<Menu.Item>
							{({ active }) => (
								<NavLink
									to="/home/collections"
									className={`${
										active ? 'bg-rose-500 text-white' : 'text-gray-900'
									} group flex w-full items-center rounded-md px-2 py-2 text-sm space-x-2`}
								>
									<Icon icon="uil:folder" />
									<span>Colecciones de notas</span>
								</NavLink>
							)}
						</Menu.Item>
						<Menu.Item>
							{({ active }) => (
								<button
									onClick={signOut}
									className={`${
										active ? 'bg-rose-500 text-white' : 'text-gray-900'
									} group flex w-full items-center rounded-md px-2 py-2 text-sm space-x-2`}
								>
									<Icon icon="uil:expand-from-corner" />
									<span>Cerrar sesión</span>
								</button>
							)}
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	)
}
export default function HomeOutlet() {
	const { isLoading, isAuthenticated } = useAuthenticationStatus()

	const user = useUserData()
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
	if (isLoading) return null
	if (!isAuthenticated && !isLoading) return <Navigate to="/login" />

	return (
		<>
			<header className="p-4 bg-rose-100 sticky top-0  z-10">
				<nav className="flex flex-row items-center justify-between container mx-auto max-w-5xl">
					<NavLink
						to="/home/general"
						className="font-bold xl:text-xl text-lg flex flex-row items-center space-x-2 hover:c-rose-400 duration-100 ease-in-out"
					>
						<Icon icon="uil:home-alt" className="h-8 w-8" />
					</NavLink>

					{isLoading ? <LoadingAvatar /> : <Avatar user={user} />}
				</nav>
			</header>

			<main className="h-screen ">
				<Outlet />
			</main>
		</>
	)
}
