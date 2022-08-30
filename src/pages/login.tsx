import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Navigate, Link } from 'react-router-dom'

import { useAuthenticationStatus, useSignInEmailPassword } from '@nhost/react'
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
	const { isLoading: loadingAuthentication, isAuthenticated } =
		useAuthenticationStatus()
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
	if (isSuccess && isAuthenticated)
		return <Navigate to="/home/general" replace={true} />
	return (
		<section className="grid place-items-center h-full min-h-screen w-full">
			<article className=" container mx-auto grid xl:grid-cols-2 grid-cols-1 place-items-center h-full">
				<form
					onSubmit={onSubmit}
					className="flex flex-col items-center justify-center space-y-4 container mx-auto   rounded-xl"
				>
					<h1 className="mb-2 text-3xl font-bold">Bienvenido a Notyx!</h1>
					<p className='mb-3'>
						Estas a un paso de poder crear tus notas personalizadas, de manera
						flexible y eficiente.
					</p>
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
						className="p-3 mb-2 text-lg font-medium rounded-xl bg-rose-200  w-96"
						disabled={isLoading}
					>
						{isLoading ? 'Iniciando...' : 'Iniciar sesión'}
					</button>
					<span className="h-12 text-red-500">{error && error.message}</span>
				</form>
				<img
					src="https://opendoodles.s3-us-west-1.amazonaws.com/ballet.svg"
					alt="Ilustración de login"
					height={500}
					width={500}
					className="xl:block hidden"
				/>
			</article>
		</section>
	)
}
