import { gql } from '@apollo/client'

export const getNotesByUserId = gql`
	query getNotesByUserId {
		get_all_notes(
			where: { userId: { _eq: "deaf3508-86ed-42be-85c7-37c26ab6a041" } }
		) {
			noteId
			title
			description
			createdAt
			userId
		}
	}
`
