import { ChangeEvent, Fragment, useState } from 'react'
import { Icon } from '@iconify/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation, useQuery } from '@apollo/client'
import { useUserData } from '@nhost/react'
import { Dialog, Transition } from '@headlessui/react'

import { getNotesByUserId } from '@/graphql/queries'
import { createNoteMutation } from '@/graphql/mutations'
import { NotesList } from '@/components/note/NoteList'
import { FormField } from '@/components/form/FormField'
import { Note, NotesQuery } from '@/types'
type QueryVariable = {
	userId: string | undefined
}

type CreateModalProps = {
	isOpen: boolean
	closeModal: () => void
}
type MutationReturnType = {
	insert_notes_one: Note
}
type MutationVariables = {
	title: string
	description: string
	userId: string
}
const createFormValidator = z.object({
	title: z.string().min(5, { message: 'Campo requerido' }),
	description: z.string().min(5, { message: 'Campo requerido' }),
})
export function CreateNoteModal({ isOpen, closeModal }: CreateModalProps) {
	const user = useUserData()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof createFormValidator>>({
		resolver: zodResolver(createFormValidator),
	})

	const [mutate, result] = useMutation<MutationReturnType, MutationVariables>(
		createNoteMutation
	)
	const onSubmit = handleSubmit((values) => {
		mutate({
			variables: {
				title: values.title,
				description: values.description,
				userId: user?.id!,
			},
		})
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
									className="text-lg font-bold font-medium leading-6 text-gray-900 mb-2"
								>
									Crear nueva nota
								</Dialog.Title>

								<form
									className="mt-2 flex flex-col items-center justify-center"
									onSubmit={onSubmit}
								>
									<FormField
										errors={errors.title?.message}
										name="title"
										disabled={result.loading}
										label="Titulo de la nota"
										register={register}
									/>
									<FormField
										errors={errors.description?.message}
										name="description"
										type="text"
										label="Descripción de la nota"
										disabled={result.loading}
										register={register}
									/>
									<div className="mt-4 flex flex-row items-center space-x-3">
										<button
											type="submit"
											className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
										>
											Crear nueva nota
										</button>
										<button
											type="button"
											className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
											onClick={closeModal}
										>
											Cerrar formulario
										</button>
									</div>
								</form>
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
