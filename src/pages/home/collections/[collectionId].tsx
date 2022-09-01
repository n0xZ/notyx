import { ChangeEvent, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Icon } from '@iconify/react'
import { useQuery } from '@apollo/client'
import { GET_COLLECTIONS_BY_COLLECTION_ID_QUERY } from '@/graphql/queries'
import LoadingSkeleton from '@/components/loading/LoadingSkeleton'
import { NotesList } from '@/components/note/NoteList'
import { CreateNoteModal } from '@/components/note/CreateNoteModal'
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
		<section className="h-full space-y-2 container mx-auto">
			<h1 className="text-3xl text-center font-semibold mt-2 mb-3">
				{loading
					? 'Cargando notas de mi coleccion...'
					: notes?.collections[0].title}
			</h1>
			<article className="h-12  mt-5  items-center space-x-3 mb-6 container mx-auto max-w-5xl flex flex-row justify-center">
				<input
					type="text"
					placeholder="Buscar nota por nombre..."
					value={noteName}
					onChange={onChange}
					name="noteName"
					className="px-5 py-3  max-w-xl rounded-lg border-2 border-gray-200 xl:w-2/4 "
				/>
				<button title="Crear nueva nota">
					<Icon icon="uil:envelope-add" className="h-8 w-8" onClick={openModal} />
				</button>
			</article>

			{loading && <LoadingSkeleton />}
			{notes && notes.collections[0].collectionNotes.length !== 0 ? (
				<NotesList notes={notes?.collections[0].collectionNotes} />
			) : (
				<p className="text-center mt-12">
					No tienes notas creadas en esta colección por el momento.
				</p>
			)}

			<CreateNoteModal closeModal={closeModal} isOpen={isOpen} />
			<Toaster position="top-right" />
		</section>
	)
}
