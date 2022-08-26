import { SupabaseClient } from '@supabase/supabase-js'

export const client = new SupabaseClient(
	import.meta.env.VITE_SUPABASE_URL!,
	import.meta.env.VITE_SUPABASE_ANON_KEY!
)
type Field = 'notes'
export const getFromDB = async (field: Field) =>
	await client.from(field).select('*')
