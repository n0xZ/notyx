import { gql } from '@apollo/client'

export const createNoteMutation = gql`
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
