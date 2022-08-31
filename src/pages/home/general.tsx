import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast, { Toaster } from 'react-hot-toast'
import { useMutation, useQuery } from '@apollo/client'
import { useUserData, useUserId } from '@nhost/react'
import { Dialog, Transition } from '@headlessui/react'

import { CREATE_NOTE_MUTATION } from '@/graphql/mutations'
import { CollectionList } from '@/components/collection/CollectionList'
import { FormField } from '@/components/form/FormField'

import LoadingCollections from '@/components/loading/LoadingCollections'
import { GET_COLLECTIONS_BY_USER_ID_QUERY } from '@/graphql/queries'
import { CollectionQuery, CollectionQueryVariables } from '@/types'

type QueryVariable = {
	userId: string | undefined
}

type CreateModalProps = {
	isOpen: boolean
	closeModal: () => void
}

const createNoteFormValidator = z.object({
	title: z.string().min(5, { message: 'Campo requerido' }),
	description: z.string().min(5, { message: 'Campo requerido' }),
})
// export function CreateNoteModal({ isOpen, closeModal }: CreateModalProps) {
// 	const userId = useUserId()
// 	const {
// 		register,
// 		handleSubmit,
// 		formState: { errors },
// 	} = useForm<z.infer<typeof createNoteFormValidator>>({
// 		resolver: zodResolver(createNoteFormValidator),
// 	})

// 	const [mutate, result] = useMutation<MutationReturnType, MutationVariables>(
// 		CREATE_NOTE_MUTATION
// 	)
// 	const onSubmit = handleSubmit((values) => {
// 		toast.promise(
// 			mutate({
// 				variables: {
// 					title: values.title,
// 					description: values.description,
// 					userId: userId!,
// 				},
// 			}),
// 			{
// 				success: 'Tarea creada con exito',
// 				error: 'Ocurrió un error al crear la nota',
// 				loading: 'Creando nota...',
// 			}
// 		)
// 	})

// 	return (
// 		<Transition appear show={isOpen} as={Fragment}>
// 			<Dialog as="div" className="relative z-10" onClose={closeModal}>
// 				<Transition.Child
// 					as={Fragment}
// 					enter="ease-out duration-300"
// 					enterFrom="opacity-0"
// 					enterTo="opacity-100"
// 					leave="ease-in duration-200"
// 					leaveFrom="opacity-100"
// 					leaveTo="opacity-0"
// 				>
// 					<div className="fixed inset-0 bg-black bg-opacity-25" />
// 				</Transition.Child>
// 				<div className="fixed inset-0 overflow-y-auto">
// 					<div className="flex min-h-full items-center justify-center p-4 text-center">
// 						<Transition.Child
// 							as={Fragment}
// 							enter="ease-out duration-300"
// 							enterFrom="opacity-0 scale-95"
// 							enterTo="opacity-100 scale-100"
// 							leave="ease-in duration-200"
// 							leaveFrom="opacity-100 scale-100"
// 							leaveTo="opacity-0 scale-95"
// 						>
// 							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
// 								<Dialog.Title
// 									as="h3"
// 									className="text-lg  font-bold leading-6 text-gray-900 mb-2"
// 								>
// 									Crear nueva nota
// 								</Dialog.Title>

// 								<form
// 									className="mt-2 flex flex-col items-center justify-center"
// 									onSubmit={onSubmit}
// 								>
// 									<FormField
// 										errors={errors.title?.message}
// 										name="title"
// 										type="text"
// 										disabled={result.loading}
// 										label="Titulo de la nota"
// 										register={register}
// 									/>
// 									<FormField
// 										errors={errors.description?.message}
// 										name="description"
// 										label="Descripción de la nota"
// 										disabled={result.loading}
// 										register={register}
// 									/>
// 									<div className="mt-4 flex flex-row items-center space-x-3">
// 										<button
// 											type="submit"
// 											className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
// 										>
// 											Crear nueva nota
// 										</button>
// 										<button
// 											type="button"
// 											className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
// 											onClick={closeModal}
// 										>
// 											Cerrar formulario
// 										</button>
// 									</div>
// 								</form>
// 							</Dialog.Panel>
// 						</Transition.Child>
// 					</div>
// 				</div>
// 			</Dialog>
// 		</Transition>
// 	)
// }
export default function MainHomePage() {
	const [noteName, setNoteName] = useState('')
	const userId = useUserId()
	const [isOpen, setIsOpen] = useState(false)

	const {
		data: collections,
		loading,
		error,
	} = useQuery<CollectionQuery, CollectionQueryVariables>(
		GET_COLLECTIONS_BY_USER_ID_QUERY,
		{
			variables: { userId },
		}
	)
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
			<h1 className='text-3xl text-center font-semibold mt-2'>Mis colecciones actuales</h1>
			<article className="h-12  mt-5  items-center space-x-3 mb-6 container mx-auto max-w-5xl flex flex-row justify-center">
				<input
					type="text"
					placeholder="Buscar colección por nombre..."
					value={noteName}
					onChange={onChange}
					name="noteName"
					className="px-5 py-3  rounded-lg border-2 border-gray-200 xl:w-2/4 max-w-2xl"
				/>
				<button title="Crear nueva tarea">
					<Icon icon="gg:add-r" className="h-8 w-8" onClick={openModal} />
				</button>
			</article>
			
			{loading && <LoadingCollections />}
			{collections && <CollectionList collections={collections?.collections} />}

			{/* <CreateNoteModal closeModal={closeModal} isOpen={isOpen} /> */}
			<Toaster position="top-right" />
		</section>
	)
}
