import { Icon } from '@iconify/react'

export default function CollectionsLoading() {
	return (
		<section className="xl:flex xl:flex-row h-screen  hidden">
			<div className="w-96  shadow-sm   border-neutral-100 border-r-2 rounded h-full col-start-1 col-end-1 container mx-auto">
				<h1 className=" font-bold text-lg mx-4 mt-2  ">COLECCIONES</h1>
				<div className="grid grid-rows-3 place-items-center mt-6">
					<div>
						<div
							className={`text-lg px-5 py-3  rounded-lg flex flex-row space-x-3 items-center h-12 w-36  bg-gray-300 mb-2 animate-pulse`}
						>
							<Icon icon="uil:folder" className="h-4 w-4" />
						</div>
						<div
							className={`text-lg px-5 py-3  rounded-lg flex flex-row space-x-3 items-center h-12 w-36  bg-gray-300 mb-2 animate-pulse`}
						>
							<Icon icon="uil:folder" className="h-4 w-4" />
						</div>
						<div
							className={`text-lg px-5 py-3  rounded-lg flex flex-row space-x-3 items-center h-12 w-36  bg-gray-300 mb-2 animate-pulse`}
						>
							<Icon icon="uil:folder" className="h-4 w-4" />
						</div>
						<div
							className={`text-lg px-5 py-3  rounded-lg flex flex-row space-x-3 items-center h-12 w-36  bg-gray-300 mb-2 animate-pulse`}
						>
							<Icon icon="uil:folder" className="h-4 w-4" />
						</div>
					</div>
				</div>
			</div>
			<article className="grid place-items-center w-full items-center"></article>
		</section>
	)
}
