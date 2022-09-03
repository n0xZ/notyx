import { gql } from '@apollo/client'

export const CREATE_NOTE_ON_EXISTING_COLLECTION_MUTATION = gql`
	mutation addNotesToCollection(
		$userId: uuid
		$collectionId: uuid!
		$collectionNotes: json
	) {
		update_collections(
			where: { userId: { _eq: $userId }, collectionId: { _eq: $collectionId } }
			_set: { collectionNotes: $collectionNotes }
		) {
			returning {
				userId
				title
				collectionNotes
				collectionId
			}
		}
	}
`

export const CREATE_COLLECTION_MUTATION = gql`
	mutation createCollection($userId: uuid!, $title: String!) {
		insert_collections_one(object: { title: $title, userId: $userId }) {
			title
			collectionId
			collectionNotes
			userId
		}
	}
`
