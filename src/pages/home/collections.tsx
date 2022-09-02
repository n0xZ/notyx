import { Link, NavLink, Outlet, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { useUserId } from '@nhost/react'
import { GET_COLLECTIONS_BY_USER_ID_QUERY } from '@/graphql/queries'
import { Collection, CollectionQuery, CollectionQueryVariables } from '@/types'
import { Icon } from '@iconify/react'

type CollectionListProps = {
	collections: Collection[]
}
function CollectionsListDisplay({ collections }: CollectionListProps) {
	return (
		<div className="grid grid-rows-3 place-items-center mt-6">
			{collections.map((collection) => (
				<div key={collection.collectionId}>
					<NavLink
						to={`/home/collections/${collection.collectionId}`}
						className={({ isActive }) =>
							`text-lg px-5 py-3  rounded-lg flex flex-row space-x-3 items-center w-64 mb-2 ${
								isActive
									? 'bg-rose-600 hover:bg-rose-800 text-neutral-50 '
									: 'hover:bg-rose-600 hover:text-neutral-50 '
							}  duration-100 ease-in-out`
						}
					>
						<div className="flex flex-row items-center space-x-3">
							<Icon icon="uil:folder" className="h-4 w-4" />
							<span className="truncate"> {collection.title}</span>
						</div>
					</NavLink>
					<Icon icon="uil:folder" className="h-4 w-4" />
				</div>
			))}
		</div>
	)
}
export default function ColllectionOutlet() {
	const userId = useUserId()
	const {
		data: collections,
		loading,
		error,
	} = useQuery<CollectionQuery, CollectionQueryVariables>(
		GET_COLLECTIONS_BY_USER_ID_QUERY,
		{
			variables: { userId },
		}
	)
	return (
		<>
			<section className="xl:flex lg:flex md:flex xl:flex-row h-screen  hidden">
				<div className="w-96  shadow-sm   border-neutral-100 border-r-2 rounded h-full col-start-1 col-end-1 container mx-auto">
					<h1 className=" font-bold text-lg mx-4 mt-2  ">COLECCIONES</h1>
					{!loading && collections && (
						<>
							<CollectionsListDisplay collections={collections?.collections} />
						</>
					)}
				</div>
				<article className="grid place-items-center w-full items-center">
					<Outlet />
				</article>
			</section>
			<section className="xl:hidden lg:hidden sm:hidden  relative min-h-screen h-full">
				<Outlet />
			</section>
		</>
	)
}
