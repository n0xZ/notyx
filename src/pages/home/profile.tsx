import { useUserData } from '@nhost/react'
import React from 'react'

export default function Profile() {
	const user = useUserData()
	return (
		<section className="grid place-items-center h-full">
			<h1>Mi perfil</h1>
			<p>{user?.email}</p>
		</section>
	)
}
