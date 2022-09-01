import { Icon } from '@iconify/react'

export function CollectionsFetchError() {
	return (
		<article className="h-screen grid-place-items">
			<aside className="flex flex-col justify-center items-center h-full text-center text-lg">
				<Icon icon="uil:folder-slash" className="h-20 w-20 mb-3" />
				<p>Ha ocurrido un error al cargar tu colección 😢</p>
				<p>Por favor, vuelva a intentarlo más tarde</p>
			</aside>
		</article>
	)
}
