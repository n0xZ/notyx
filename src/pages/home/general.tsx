import { ChangeEvent, lazy, useState } from 'react'
import { Icon } from '@iconify/react'

import { Toaster } from 'react-hot-toast'
import { useQuery } from '@apollo/client'
import { useUserId } from '@nhost/react'

import { GET_COLLECTIONS_BY_USER_ID_QUERY } from '@/graphql/queries'
import { CollectionList } from '@/components/collection/CollectionList'
import { CollectionsFetchError } from '@/components/error/CollectionsFetchError'
import LoadingCollectionsSkeleton from '@/components/loading/LoadingCollectionsSkeleton'
import { CollectionQuery, CollectionQueryVariables } from '@/types'

const LazyCreateCollectionModal = lazy(
	() => import('@/components/collection/CreateCollectionModal')
)
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
		<section className="h-full space-y-6 ">
			<article className="h-12  mt-5  items-center space-x-6 mb-6 container mx-auto max-w-5xl flex flex-row justify-center">
				<h1 className="text-3xl text-center font-semibold mt-2 mb-3">
					Mis colecciones actuales
				</h1>
				<button title="Crear nueva nota">
					<Icon icon="uil:folder-plus" className="h-8 w-8" onClick={openModal} />
				</button>
			</article>
			{!loading && collections && (
				<CollectionList collections={collections?.collections} />
			)}

			<LazyCreateCollectionModal closeModal={closeModal} isOpen={isOpen} />
			<Toaster position="top-right" />
		</section>
	)
}
