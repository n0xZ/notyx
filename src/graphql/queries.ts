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
