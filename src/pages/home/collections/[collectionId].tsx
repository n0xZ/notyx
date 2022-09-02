import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useQuery } from '@apollo/client'
import { GET_COLLECTIONS_BY_COLLECTION_ID_QUERY } from '@/graphql/queries'
import { NotesList } from '@/components/note/NoteList'
import { CreateNoteModal } from '@/components/note/CreateNoteModal'
import { CollectionQuery } from '@/types'
export type CollectionVariables = {
	collectionId?: string
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
export default function CollectionById() {
	const params = useParams()
	const [noteName, setNoteName] = useState('')
	const [isOpen, setIsOpen] = useState(false)

	const {
		loading,
		data: notes,
		refetch,
	} = useQuery<CollectionQuery, CollectionVariables>(
		GET_COLLECTIONS_BY_COLLECTION_ID_QUERY,
		{
			variables: { collectionId: params.collectionId },
		}
	)

	const openModal = () => {
		setIsOpen(true)
	}
	const closeModal = () => {
		setIsOpen(false)
	}

	return (
		<motion.section
			initial="initial"
			animate="enter"
			variants={transitionVariants}
			className="h-full space-y-2 container mx-auto"
		>
			<article className="h-12  mt-5  items-center space-x-6 mb-6 container mx-auto max-w-5xl flex flex-row justify-center">
				<h1 className="text-3xl text-center font-semibold mt-2 mb-3">
					{loading
						? 'Cargando notas de mi coleccion...'
						: notes?.collections[0].title}
				</h1>
				<button title="Crear nueva nota">
					<Icon icon="uil:envelope-add" className="h-8 w-8" onClick={openModal} />
				</button>
			</article>

			{!loading && notes && notes.collections[0].collectionNotes.length !== 0 && (
				<NotesList notes={notes?.collections[0].collectionNotes} />
			)}
			{(!loading && !notes) ||
				(notes && notes.collections[0].collectionNotes.length === 0 && (
					<p className="text-center mt-12">
						No tienes notas creadas en esta colección por el momento.
					</p>
				))}
			{notes && (
				<CreateNoteModal
					actualNotes={notes?.collections[0].collectionNotes}
					refetch={refetch}
					closeModal={closeModal}
					isOpen={isOpen}
					collectionId={params.collectionId}
				/>
			)}
			<Toaster position="top-right" />
		</motion.section>
	)
}
