import { Link } from 'react-router-dom'
import { useUserAvatarUrl } from '@nhost/react'
import { motion } from 'framer-motion'
import { Collection } from '@/types'

type Props = {
	collection: Collection
}

export function CollectionItem({ collection }: Props) {
	const avatar = useUserAvatarUrl()

	return (
		<Link
			to={`/home/collections/${collection.collectionId}`}
			className="h-36 w-72 rounded-md border-2 border-rose-300 flex flex-col space-y-2 flex-wrap justify-center items-center text-center p-2 space-x-2 hover:opacity-60 duration-100 ease-in-out"
		>
			<img src={avatar} className="rounded-full h-12" alt="Imagen del usuario" />

			<p className="truncate font-bold">{collection.title}</p>
		</Link>
	)
}
