export type Note = {
	noteId: string
	title: string
	description: string
	createdAt: Date
	userId: string
}

export type NotesQuery = {
	data: { note_by_userId: Note[] }
}
