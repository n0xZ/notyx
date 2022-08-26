import { Icon } from '@iconify/react'
import { client } from '@/lib/supabase'

export default function LoginPage() {
	return (
		<section className="grid place-items-center h-full min-h-screen">
			<article className=" container mx-auto ">
				<button
					onClick={() => client.auth.signIn({ provider: 'github' })}
					className="flex flex-row items-center space-x-2 px-5 py-3 rounded-xl xl:text-lg textl-xl  bg-neutral-800 hover:bg-neutral-600 duration-100 ease-in font-bold"
				>
					<Icon icon="mdi:github" className="h-6 w-6" />
					<span>Iniciar sesión desde github</span>
				</button>
			</article>
		</section>
	)
}
