import { motion } from 'framer-motion'
import { CollectionItem } from './CollectionItem'
import { Collection } from '@/types'

type Props = {
	collections: Collection[]
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
export function CollectionList({ collections }: Props) {
	return (
		<motion.article
			initial="initial"
			animate="enter"
			variants={transitionVariants}
			className="grid grid-rows-2 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5 place-items-center mt-10 container mx-auto "
		>
			{collections.map((collection) => (
				<CollectionItem collection={collection} key={collection.collectionId} />
			))}
			<div className="text-lg px-5 py-3  rounded-lg flex flex-row space-x-3 items-center w-64 mb-2"></div>
		</motion.article>
	)
}
