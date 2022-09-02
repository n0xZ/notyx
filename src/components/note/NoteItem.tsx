import { Fragment, useState } from 'react'
import { useUserAvatarUrl } from '@nhost/react'
import { motion } from 'framer-motion'
import { Dialog, Transition } from '@headlessui/react'
import { Note } from '@/types'
type Props = {
	note: Note
}
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
type ViewNoteContentProps = {
	isOpen: boolean
	closeModal: () => void
	note: Note
}
function ViewNoteContent({ isOpen, note, closeModal }: ViewNoteContentProps) {
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={closeModal}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-25" />
				</Transition.Child>
				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl  bg-white p-6 text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="h3"
									className="text-lg  font-bold leading-6 text-gray-900 mb-2"
								>
									{note.title}
								</Dialog.Title>
								<p>{note.description}</p>

								<button
									type="button"
									className="inline-flex mt-4 justify-center rounded-md border border-transparent bg-red-300 px-4 py-2 text-base	 font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
									onClick={closeModal}
								>
									Cerrar nota
								</button>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	)
}
export function NoteItem({ note }: Props) {
	const avatar = useUserAvatarUrl()
	const [isOpen, setIsOpen] = useState(false)
	const openModal = () => {
		setIsOpen(true)
	}
	const closeModal = () => {
		setIsOpen(false)
	}

	return (
		<motion.aside
			initial="initial"
			animate="enter"
			variants={transitionVariants}
			className="h-24 w-72 rounded-md border-2 border-light flex flex-row flex-wrap justify-center items-center text-center p-2 space-x-2"
		>
			<img src={avatar} className="rounded-full h-12" alt="Imagen del usuario" />
			<div className="flex flex-col justify-between  h-full items-center">
				<p className="truncate font-bold">{note.title}</p>

				<button
					className="bg-rose-600 hover:bg-rose-800 text-neutral-50   px-2 py-1  rounded-lg flex flex-row space-x-3 items-center  mb-2 duration-100 ease-in-out"
					onClick={openModal}
				>
					Ver contenido
				</button>
				<ViewNoteContent note={note} closeModal={closeModal} isOpen={isOpen} />
			</div>
		</motion.aside>
	)
}
