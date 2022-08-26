import { getFromDB } from '@/lib/supabase'

import { useQuery } from '@tanstack/react-query'

export default function MainHomePage() {
	const { data } = useQuery(['notes'], async () => await getFromDB('notes'))

	return <section></section>
}
