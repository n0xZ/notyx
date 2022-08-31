export type Note = {
	noteId: string
	title: string
	description: string
	createdAt: Date
}
export type Collection = {
	collectionId: string
	title: string
	userId: string
	collectionNotes: Note[]
}
export type NotesQuery = {
	get_all_notes: Note[]
}

export type CollectionQuery = {
	collections: Collection[]
}

export type CollectionQueryVariables = {
	userId?: string
}

export type CreateNoteMutationReturnType = {
	insert_notes_one: Note
}
export type CreateNoteMutationVariables = {
	title: string
	description: string
	userId: string
}
