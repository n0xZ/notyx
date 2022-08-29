import { ChangeEvent, Fragment, useState } from 'react'
import { Icon } from '@iconify/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useQuery } from '@apollo/client'
import { useUserData } from '@nhost/react'
import { Dialog, Transition } from '@headlessui/react'
import { getNotesByUserId } from '@/graphql/queries'
import { NotesList } from '@/components/note/NoteList'
import { LoadingSpinner } from '@/components/loading/LoadingSpinner'
import { NotesQuery } from '@/types'
type QueryVariable = {
	userId: string | undefined
}

type CreateModalProps = {
	isOpen: boolean

	closeModal: () => void
}
const createFormValidator = z.object({
	title: z.string().min(5, { message: 'Campo requerido' }),
	description: z.string().min(5, { message: 'Campo requerido' }),
})
export function CreateNoteModal({ isOpen, closeModal }: CreateModalProps) {
	const {
		register,
		formState: { errors },
	} = useForm<z.infer<typeof createFormValidator>>({
		resolver: zodResolver(createFormValidator),
	})
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
							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="h3"
									className="text-lg font-medium leading-6 text-gray-900"
								>
									Crear nueva nota
								</Dialog.Title>
								<div className="mt-2">
									<p className="text-sm text-gray-500">
										Your payment has been successfully submitted. We’ve sent you an email
										with all of the details of your order.
									</p>
								</div>

								<div className="mt-4">
									<button
										type="button"
										className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
										onClick={closeModal}
									>
										Got it, thanks!
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	)
}
export default function MainHomePage() {
	const [noteName, setNoteName] = useState('')
	const user = useUserData()
	const [isOpen, setIsOpen] = useState(false)
	const {
		data: notes,
		loading,
		error,
	} = useQuery<NotesQuery, QueryVariable>(getNotesByUserId, {
		variables: { userId: user?.id },
	})
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNoteName(e.target.value)
	}
	const openModal = () => {
		setIsOpen(true)
	}
	const closeModal = () => {
		setIsOpen(false)
	}
	if (error) return <div>Hubo un error al cargar las notas.</div>
	return (
		<section className="h-full space-y-2 ">
			<article className="h-12  mt-5 flex flex-row items-center space-x-3 mb-6 container mx-auto max-w-5xl">
				<input
					type="text"
					placeholder="Buscar nota por nombre..."
					value={noteName}
					onChange={onChange}
					name="noteName"
					className="px-5 py-3 rounded-lg border-2 border-gray-200 w-2xl"
				/>
				<button title="Crear nueva tarea">
					<Icon
						icon="carbon:document-tasks"
						className="h-8 w-8"
						onClick={openModal}
					/>
				</button>
			</article>
			{notes && !loading && <NotesList notes={notes?.get_all_notes} />}
			<CreateNoteModal closeModal={closeModal} isOpen={isOpen} />
		</section>
	)
}
