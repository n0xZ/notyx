import { gql } from '@apollo/client'

export const CREATE_NOTE_MUTATION = gql`
	mutation createNote($userId: uuid, $title: String!, $description: String!) {
		insert_notes_one(
			object: { title: $title, userId: $userId, description: $description }
		) {
			title
			description
			noteId
			createdAt
			userId
		}
	}
`
export const CREATE_NOTE_ON_EXISTING_COLLECTION = gql``
export const CREATE_COLLECTION_MUTATION = gql`
	mutation createCollection($userId: uuid!, $title: String!) {
		insert_collections_one(object: { title: $title, userId: $userId }) {
			title
			collectionId
			collectionNotes {
				title
				noteId
				description
			}
			userId
		}
	}
`

export const UPDATE_NOTES_MUTATION = gql`
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
