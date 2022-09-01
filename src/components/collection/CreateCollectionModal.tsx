import { Fragment } from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { useMutation } from '@apollo/client'
import { useUserId } from '@nhost/react'
import { Dialog, Transition } from '@headlessui/react'

import { CREATE_COLLECTION_MUTATION } from '@/graphql/mutations'

import { FormField } from '@/components/form/FormField'

import { Collection } from '@/types'

type CreateCollectionModalProps = {
	isOpen: boolean
	closeModal: () => void
}

type MutationReturnType = {
	insert_collections_one: Collection
}
type MutationVariables = {
	userId?: string
	title: string
}
const createNoteFormValidator = z.object({
	title: z.string().min(5, { message: 'Campo requerido' }),
})
export function CreateCollectionModal({
	isOpen,
	closeModal,
}: CreateCollectionModalProps) {
	const userId = useUserId()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof createNoteFormValidator>>({
		resolver: zodResolver(createNoteFormValidator),
	})

	const [mutate, result] = useMutation<MutationReturnType, MutationVariables>(
		CREATE_COLLECTION_MUTATION
	)
	const onSubmit = handleSubmit((values) => {
		toast.promise(
			mutate({
				variables: {
					title: values.title,
					userId: userId!,
				},
			}),
			{
				success: 'Colección creada con exito',
				error: 'Ocurrió un error al crear la colección',
				loading: 'Creando colección...',
			}
		)
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
									className="text-lg  font-bold leading-6 text-gray-900 mb-2"
								>
									Crear nueva colección
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
										label="Titulo de la colección"
										placeholder="Mi nueva colección"
										register={register}
									/>

									<div className="mt-4 flex flex-row items-center space-x-3">
										<button
											type="submit"
											className="inline-flex justify-center rounded-md border border-transparent bg-rose-400 px-4 py-2 text-base font-medium text-neutral-50 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
										>
											Crear nueva colección
										</button>
										<button
											type="button"
											className="inline-flex justify-center rounded-md border border-transparent bg-red-300 px-4 py-2 text-base	 font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
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
