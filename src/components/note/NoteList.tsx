import { NoteItem } from './NoteItem'
import { Note } from '@/types'

type Props = {
	notes: Note[]
}
export function NotesList({ notes }: Props) {
	return (
		<article className="grid grid-rows-2 gap-4 place-items-center mt-6 container mx-auto ">
			{notes.map((note) => (
				<NoteItem note={note} key={note.noteId} />
			))}
		</article>
	)
}
