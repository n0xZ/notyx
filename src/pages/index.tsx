import { ReactNode, Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, Transition } from '@headlessui/react'
import { Icon } from '@iconify/react'

function NavMenu() {
	return (
		<Menu
			as="div"
			className="relative xl:hidden lg:hidden inline-block text-left"
		>
			<div>
				<Menu.Button className="inline-flex w-full justify-center items-center rounded-md bg-zinc-900 bg-opacity-60 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
					<Icon
						icon="uil:align-justify"
						className=" h-5 w-5 text-rose-200 hover:text-rose-100"
						aria-hidden="true"
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
									to="/login"
									className={`${
										active ? 'bg-rose-600 text-white' : 'text-gray-900'
									} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
								>
									Iniciar sesión
								</NavLink>
							)}
						</Menu.Item>
						<Menu.Item>
							{({ active }) => (
								<NavLink
									to="/register"
									className={`${
										active ? 'bg-rose-600 text-white' : 'text-gray-900'
									} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
								>
									Unete ya!
								</NavLink>
							)}
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	)
}
export const LandingLayout = ({ children }: { children: ReactNode }) => {
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
	return (
		<>
			<header className="p-4">
				<nav className="flex flex-row items-center justify-between container mx-auto max-w-6xl font-bold">
					<NavLink to="/">Notyx</NavLink>
					<NavMenu />
					<ul className="xl:flex flex-row items-center space-x-5 hidden xl:sticky">
						<li>
							<NavLink to="/login">Iniciar sesión</NavLink>
						</li>
						<li className="bg-rose-400 px-5 py-3 rounded-lg text-neutral-50">
							<NavLink to="/register">Unete ya!</NavLink>
						</li>
					</ul>
				</nav>
			</header>
			<motion.main
				className=" h-screen "
				initial="initial"
				animate="enter"
				variants={transitionVariants}
			>
				{children}
			</motion.main>
		</>
	)
}
export default function Landing() {
	return (
		<LandingLayout>
			<section className="flex flex-col justify-center items-center space-y-10 h-full ">
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
				<img
					src="https://opendoodles.s3-us-west-1.amazonaws.com/clumsy.svg"
					alt="Imagen de la landing"
					className="rounded"
					height={480}
					width={480}
				/>
			</section>

			<section className="grid place-items-center h-screen bg-rose-200">
				<article className="flex flex-col justify-center space-y-3 text-center">
					<h1 className="text-3xl">Que puedes realizar en Notyx?</h1>
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
			</section>
		</LandingLayout>
	)
}
