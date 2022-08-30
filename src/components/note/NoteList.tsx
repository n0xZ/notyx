import { NoteItem } from './NoteItem'
import { Note } from '@/types'

type Props = {
	notes: Note[]
}
export function NotesList({ notes }: Props) {
	return (
		<article className="grid grid-rows-2 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5 place-items-center mt-6 container mx-auto ">
			{notes.map((note) => (
				<NoteItem note={note} key={note.noteId} />
			))}
		</article>
	)
}
