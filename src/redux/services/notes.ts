import { UserMetadata } from 'firebase/auth'
import { collection, doc, DocumentData, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

import { api } from './api'
import { Note } from '@/types'

type Credentials = {
	email: string
	password: string
}
type UserResponse = {
	email: string | null
	displayName: string | null
	metadata: UserMetadata
}
export const notesApi = api.injectEndpoints({
	endpoints: (build) => ({
		getNotes: build.query<Note[], 'notes'>({
			async queryFn(args) {
				const notesDoc = doc(db, 'notes')
				const notesQuery = await getDoc(notesDoc)
				const notesData = notesQuery.data() as Note[]

				return { data: notesData }
			},
		}),
	}),
})
export const { useGetNotesQuery } = notesApi
