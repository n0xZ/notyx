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

export type CollectionQuery = {
	collections: Collection[]
}

export type CollectionQueryVariables = {
	userId?: string
}
