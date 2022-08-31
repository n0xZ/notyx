import React from 'react'
import { Outlet } from 'react-router-dom'

export default function ColllectionOutlet() {
	return (
		<section className='xl:flex hidden'>
			<Outlet />
		</section>
	)
}
