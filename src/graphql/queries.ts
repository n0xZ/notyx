import { gql } from '@apollo/client'

export const GET_NOTES_BY_USER_ID_QUERY = gql`
	query getNotesByUserId($userId: uuid) {
		get_all_notes(where: { userId: { _eq: $userId } }) {
			noteId
			title
			description
			createdAt
		}
	}
`

export const GET_COLLECTIONS_BY_USER_ID_QUERY = gql`
	query getCollectionNotesByUserId($userId: uuid!) {
		collections(where: { userId: { _eq: $userId } }) {
			title
			collectionId
			collectionNotes {
				title
				description
			}
		}
	}
`
export const GET_COLLECTIONS_BY_COLLECTION_ID_QUERY = gql`
	query getCollectionNotesByUserId($collectionId: uuid!) {
		collections(where: { collectionId: { _eq: $collectionId } }) {
			collectionNotes {
				title
				description
			}
		}
	}
`
