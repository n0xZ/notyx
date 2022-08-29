import { Navigate, NavLink, Outlet } from 'react-router-dom'
import { useAuthenticationStatus, useSignOut, useUserData } from '@nhost/react'

import { Menu, Transition } from '@headlessui/react'
import { motion } from 'framer-motion'
import { Fragment } from 'react'
import LoadingAvatar from '@/components/loading/LoadingAvatar'
type AvatarProps = {
	user: ReturnType<typeof useUserData>
}
export const Avatar = ({ user }: AvatarProps) => {
	return (
		<Menu as="div" className="relative inline-block text-left">
			<div>
				<Menu.Button className=" w-full justify-center rounded-md bg-black bg-opacity-20  text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
					<img
						src={user?.avatarUrl}
						alt={`${user?.displayName} image`}
						className="rounded-full w-12"
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
				<Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
					<div className="px-1 py-1 ">
						<Menu.Item>
							{({ active }) => (
								<NavLink
									to="/home/profile"
									className={`${
										active ? 'bg-violet-500 text-white' : 'text-gray-900'
									} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
								>
									Mi perfil
								</NavLink>
							)}
						</Menu.Item>
						<Menu.Item>
							{({ active }) => (
								<button
									className={`${
										active ? 'bg-violet-500 text-white' : 'text-gray-900'
									} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
								>
									Duplicate
								</button>
							)}
						</Menu.Item>
					</div>
					<div className="px-1 py-1">
						<Menu.Item>
							{({ active }) => (
								<button
									className={`${
										active ? 'bg-violet-500 text-white' : 'text-gray-900'
									} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
								>
									Archive
								</button>
							)}
						</Menu.Item>
						<Menu.Item>
							{({ active }) => (
								<button
									className={`${
										active ? 'bg-violet-500 text-white' : 'text-gray-900'
									} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
								></button>
							)}
						</Menu.Item>
					</div>
					<div className="px-1 py-1">
						<Menu.Item>
							{({ active }) => (
								<button
									className={`${
										active ? 'bg-violet-500 text-white' : 'text-gray-900'
									} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
								></button>
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
	const { signOut } = useSignOut()
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

	if (!isAuthenticated && !isLoading)
		return <Navigate to="/login" replace={true} />
	return (
		<>
			<header className="p-3 bg-rose-100 sticky top-0 h-19">
				<nav className="flex flex-row items-center justify-between container mx-auto max-w-6xl">
					<NavLink to="/home/main" className="h-6 w-6">
						Home
					</NavLink>
					{isLoading ? <LoadingAvatar /> : <Avatar user={user} />}
				</nav>
			</header>

			<motion.main
				initial="initial"
				animate="enter"
				variants={transitionVariants}
				className="h-screen "
			>
				<Outlet />
			</motion.main>
		</>
	)
}
