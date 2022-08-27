import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'

import { useSignInEmailPassword } from '@nhost/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormField } from '@/components/form/FormField'
import { nhost } from '@/lib/nhost'

export const signInValidator = z.object({
	email: z
		.string()
		.min(6, { message: 'Campo requerido' })
		.email({ message: 'Formato de email ingresado no válido' }),
	password: z.string().min(5, { message: 'Campo requerido' }),
})

export default function LoginPage() {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<z.infer<typeof signInValidator>>({
		resolver: zodResolver(signInValidator),
	})
	const {
		error,
		isLoading,
		isSuccess,
		needsEmailVerification,
		signInEmailPassword,
	} = useSignInEmailPassword()
	const onSubmit = handleSubmit(async ({ email, password }) => {
		await signInEmailPassword(email, password)
	})
	if (isSuccess) return <Navigate to="/home/main" replace={true} />
	return (
		<section className="grid place-items-center h-full min-h-screen">
			<article className=" container mx-auto ">
				<form
					onSubmit={onSubmit}
					className="flex flex-col items-center justify-center space-y-2 container mx-auto"
				>
					<FormField
						errors={errors.email?.message}
						name="email"
						disabled={isLoading}
						label="Correo electrónico"
						register={register}
					/>
					<FormField
						errors={errors.password?.message}
						name="password"
						type="password"
						label="Contraseña"
						disabled={isLoading}
						register={register}
					/>
					<button
						type="submit"
						className="p-3 mb-2 text-lg font-bold rounded-xl bg-amber  w-96"
						disabled={isLoading}
					>
						{isLoading ? 'Iniciando...' : 'Iniciar sesión'}
					</button>
					<span className="h-12 c-red-500">{error && error.message}</span>
				</form>
			</article>
		</section>
	)
}
