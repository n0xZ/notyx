import { Collection } from '@/types'
import { CollectionItem } from './CollectionItem'

type Props = {
	collections: Collection[]
}

export  function CollectionList({ collections }: Props) {
	return (
		<article className="grid grid-rows-2 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5 place-items-center mt-6 container mx-auto ">
			{collections.map((collection) => (
				<CollectionItem collection={collection} key={collection.collectionId} />
			))}
		</article>
	)
}
