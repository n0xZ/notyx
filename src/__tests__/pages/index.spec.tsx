import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Landing from '@/pages/index'

describe('Home page test case', () => {
	it('Should render the homepage ', () => {
		render(
			<BrowserRouter>
				<Landing />
			</BrowserRouter>
		)
		expect(
			screen.getByText('Crea tus notas de manera personalizada')
		).toBeDefined()
	})
})
