import { gql } from '@apollo/client'

export const getNotesByUserId = gql`
	query getNotesByUserId($userId: uuid) {
		get_all_notes(where: { userId: { _eq: $userId } }) {
			noteId
			title
			description
			createdAt
		}
	}
`

export const getCollectionsByUserId = gql`
	query getCollectionNotesByUserId($userId: uuid!) {
		collections(where: { userId: { _eq: $userId } }) {
			title
			collectionNotes {
				title
				description
			}
		}
	}
`
export const updateNotesCollection = gql`
	mutation updateCollection($userId: uuid, $collectionId: uuid!, $notes: jsonb) {
		update_collections(
			where: { userId: { _eq: $userId }, collectionId: { _eq: $collectionId } }
			_prepend: { notes: $notes }
		) {
			returning {
				title
				notes
				collectionId
			}
		}
	}
`
