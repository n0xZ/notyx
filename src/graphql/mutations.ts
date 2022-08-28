import { gql } from '@apollo/client'

export const createNoteMutation = gql`
	mutation createNote($userId: uuid!, $title: String!, $description: String!) {
		insert_notes(
			objects: { title: $title, description: $description, userId: $userId }
		) {
			returning {
				noteId
				title
				description
				createdAt
			}
		}
	}
`
