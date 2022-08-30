import { motion } from 'framer-motion'
import { Note } from '@/types'
import { useUserAvatarUrl } from '@nhost/react'
type Props = {
	note: Note
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
export function NoteItem({ note }: Props) {
	const avatar = useUserAvatarUrl()
	return (
		<motion.aside
			initial="initial"
			animate="enter"
			variants={transitionVariants}
			className="h-24 w-72 rounded-md border-2 border-light flex flex-row flex-wrap justify-center items-center text-center p-2 space-x-2"
		>
			<img src={avatar} className="rounded-full h-12" alt="Imagen del usuario" />
			<div className='flex flex-col justify-center items-center'>
				<p className="truncate font-bold">{note.title}</p>
				<p>asd</p>
			</div>
		</motion.aside>
	)
}
