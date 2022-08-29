import { Note } from '@/types'

type Props = {
	note: Note
}
export  function NoteItem({ note }: Props) {
	return (
		<aside className="w-96 h-32 rounded-xl border-2 border-light flex flex-col justify-center text-center p-2">
			<p>{note.title}</p>
			<p>{note.createdAt.toString()}</p>
		</aside>
	)
}
