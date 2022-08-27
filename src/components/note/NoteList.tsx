import { Note } from '@/types'
import React from 'react'
import NoteItem from './NoteItem'
type Props = {
	notes: Note[]
}
export default function NotesList({ notes }: Props) {
	return (
		<section>
			{notes.map((note) => (
				<NoteItem note={note} />
			))}
		</section>
	)
}
