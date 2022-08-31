import { ChangeEvent, useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { useParams } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useQuery } from '@apollo/client'

import { GET_COLLECTIONS_BY_COLLECTION_ID_QUERY } from '@/graphql/queries'
import LoadingSkeleton from '@/components/loading/LoadingSkeleton'
import { NotesList } from '@/components/note/NoteList'
import { CollectionQuery } from '@/types'
type CollectionVariables = {
	collectionId?: string
}

export default function CollectionById() {
	const params = useParams()
	const [noteName, setNoteName] = useState('')
	const [isOpen, setIsOpen] = useState(false)

	const { loading, data: notes } = useQuery<
		CollectionQuery,
		CollectionVariables
	>(GET_COLLECTIONS_BY_COLLECTION_ID_QUERY, {
		variables: { collectionId: params.collectionId },
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

	return (
		<section className="h-full space-y-2 ">
			<h1 className="text-3xl text-center font-semibold mt-2 mb-3">
				Notas de mi colección
			</h1>
			<article className="h-12  mt-5  items-center space-x-3 mb-6 container mx-auto max-w-5xl flex flex-row justify-center">
				<input
					type="text"
					placeholder="Buscar nota por nombre..."
					value={noteName}
					onChange={onChange}
					name="noteName"
					className="px-5 py-3  rounded-lg border-2 border-gray-200 xl:w-2/4 max-w-2xl"
				/>
				<button title="Crear nueva tarea">
					<Icon icon="gg:add-r" className="h-8 w-8" onClick={openModal} />
				</button>
			</article>

			{loading && <LoadingSkeleton />}
			{notes && <NotesList notes={notes?.collections[0].collectionNotes} />}

			{/* <CreateNoteModal closeModal={closeModal} isOpen={isOpen} /> */}
			<Toaster position="top-right" />
		</section>
	)
}
