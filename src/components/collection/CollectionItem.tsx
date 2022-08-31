import { Link } from 'react-router-dom'
import { useUserAvatarUrl } from '@nhost/react'
import { motion } from 'framer-motion'
import { Collection } from '@/types'

type Props = {
	collection: Collection
}
const transitionVariants = {
	initial: {
		opacity: 0,
		y: 8,
	},
	enter: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.4,
			ease: [0.61, 1, 0.88, 1],
		},
	},
}
export function CollectionItem({ collection }: Props) {
	const avatar = useUserAvatarUrl()
	const AnimatedLink = motion(Link)
	return (
		<Link
			to={`/home/collections/${collection.collectionId}`}
			className="h-36 w-72 rounded-md border-2 border-rose-300 flex flex-row flex-wrap justify-center items-center text-center p-2 space-x-2 hover:opacity-60 duration-100 ease-in-out"
		>
			<img src={avatar} className="rounded-full h-12" alt="Imagen del usuario" />

			<p className="truncate font-bold">{collection.title}</p>
		</Link>
	)
}
