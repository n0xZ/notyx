export type Note = {
	noteId: string
	title: string
	description: string
	createdAt: Date
	userId: string
}

export type NotesQuery = {
	get_all_notes: Note[]
}
