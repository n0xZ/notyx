import { ChangeEvent, useState } from 'react'
import { Icon } from '@iconify/react'

import { Toaster } from 'react-hot-toast'
import { useQuery } from '@apollo/client'
import { useUserId } from '@nhost/react'

import { GET_COLLECTIONS_BY_USER_ID_QUERY } from '@/graphql/queries'
import { CollectionList } from '@/components/collection/CollectionList'
import { CollectionsFetchError } from '@/components/error/CollectionsFetchError'
import LoadingCollections from '@/components/loading/LoadingCollections'
import { CollectionQuery, CollectionQueryVariables } from '@/types'
import { CreateCollectionModal } from '@/components/collection/CreateCollectionModal'

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
	if (error) return <CollectionsFetchError />
	return (
		<section className="h-full space-y-2 ">
			<h1 className="text-3xl text-center font-semibold m-6">
				Mis colecciones actuales
			</h1>
			<article className="h-12  mt-5  items-center space-x-3 mb-6 container mx-auto max-w-5xl flex flex-row justify-center">
				<input
					type="text"
					placeholder="Buscar colección por nombre..."
					value={noteName}
					onChange={onChange}
					name="noteName"
					className="px-5 py-3  rounded-lg border-2 border-gray-200 xl:w-2/4 max-w-2xl"
				/>
				<button title="Crear nueva colección">
					<Icon icon="uil:folder-plus" className="h-8 w-8" onClick={openModal} />
				</button>
			</article>

			{loading && <LoadingCollections />}
			{collections && <CollectionList collections={collections?.collections} />}

			<CreateCollectionModal closeModal={closeModal} isOpen={isOpen} />
			<Toaster position="top-right" />
		</section>
	)
}
