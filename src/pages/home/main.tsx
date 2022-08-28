import { useQuery } from '@apollo/client'
import { useUserData } from '@nhost/react'
import { getNotesByUserId } from '@/graphql/queries'
import { NotesQuery } from '@/types'
type QueryVariable = {
	userId: string | undefined
}
export default function MainHomePage() {
	const user = useUserData()
	const { data, loading } = useQuery<NotesQuery, QueryVariable>(
		getNotesByUserId,
		{
			variables: { userId: user?.id },
		}
	)
	if (loading) return <div>Cargando notas...</div>

	return (
		<section className="grid place-items-center h-full">
			<article></article>
		</section>
	)
}
