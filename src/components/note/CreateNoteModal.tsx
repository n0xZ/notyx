import { Fragment } from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { ApolloQueryResult, useMutation } from '@apollo/client'
import { useUserId } from '@nhost/react'
import { Dialog, Transition } from '@headlessui/react'
import uuid from 'react-uuid'
import { CREATE_NOTE_ON_EXISTING_COLLECTION_MUTATION } from '@/graphql/mutations'

import { FormField } from '@/components/form/FormField'
import { CollectionVariables } from '@/pages/home/collections/[collectionId]'

import { Note, CollectionQuery } from '@/types'

type CreateNoteModalProps = {
	isOpen: boolean
	closeModal: () => void
	collectionId?: string
	actualNotes: Note[]
	refetch: (
		variables?: Partial<CollectionVariables> | undefined
	) => Promise<ApolloQueryResult<CollectionQuery>>
}

 type CreateNoteMutationReturnType = {
	insert_notes_one: Note
}
 type CreateNoteMutationVariables = {
	userId: string
	collectionId?: string
	collectionNotes: Note[]
}
const createNoteFormValidator = z.object({
	title: z.string().min(5, { message: 'Campo requerido' }),
	description: z.string().min(5, { message: 'Campo requerido' }),
})
export function CreateNoteModal({
	isOpen,
	closeModal,
	collectionId,
	actualNotes,
	refetch,
}: CreateNoteModalProps) {
	const userId = useUserId()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof createNoteFormValidator>>({
		resolver: zodResolver(createNoteFormValidator),
	})

	const [mutate, result] = useMutation<
		CreateNoteMutationReturnType,
		CreateNoteMutationVariables
	>(CREATE_NOTE_ON_EXISTING_COLLECTION_MUTATION)
	const onSubmit = handleSubmit((values) => {
		const collectionNotes: Note[] = [
			...actualNotes,
			{
				noteId: uuid(),
				title: values.title,
				description: values.description,
				createdAt: new Date(),
			},
		]

		toast.promise(
			mutate({
				variables: {
					userId: userId!,
					collectionId,
					collectionNotes,
				},
			}),
			{
				success: 'nota creada con exito',
				error: 'Ocurrió un error al crear la nota',
				loading: 'Creando nota...',
			}
		)
	})
	if (result.data) refetch({ collectionId })
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
									className="text-lg  font-bold leading-6 text-gray-900 mb-2"
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
										type="text"
										disabled={result.loading}
										label="Titulo de la nota"
										register={register}
									/>
									<FormField
										errors={errors.description?.message}
										name="description"
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
