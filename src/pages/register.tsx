import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useSignUpEmailPassword } from '@nhost/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormField } from '@/components/form/FormField'
import { Navigate } from 'react-router-dom'

export const signUpValidator = z.object({
	email: z
		.string()
		.min(6, { message: 'Campo requerido' })
		.email({ message: 'Formato de email ingresado no válido' }),
	password: z.string().min(5, { message: 'Campo requerido' }),
})

export default function RegisterPage() {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<z.infer<typeof signUpValidator>>({
		resolver: zodResolver(signUpValidator),
	})
	const { isLoading, isSuccess, needsEmailVerification, signUpEmailPassword } =
		useSignUpEmailPassword()
	const onSubmit = handleSubmit(async ({ email, password }) => {
		await signUpEmailPassword(email, password)
	})
	if (isSuccess) return <Navigate to="/home/general" replace={true} />
	return (
		<section className="grid place-items-center h-full min-h-screen">
			{needsEmailVerification ? (
				<p>Por favor, revise su correo para confirmar su cuenta.</p>
			) : (
				<article className="container mx-auto grid xl:grid-cols-2 grid-cols-1 place-items-center h-full">
					<form
						onSubmit={onSubmit}
						className="flex flex-col items-center justify-center space-y-4 container mx-auto   rounded-xl"
					>
						<h1 className="mb-2 text-3xl font-bold text-center">
							Bienvenido a Notyx!
						</h1>
						<p className="mb-3 text-center">
							Estas a un paso de poder crear tus colecciones de notas personalizadas,
							de manera flexible y eficiente.
						</p>
						<FormField
							errors={errors.email?.message}
							disabled={isLoading}
							type="email"
							name="email"
							label="Correo electrónico"
							placeholder="gonzalo123@miemail.com"
							register={register}
						/>
						<FormField
							errors={errors.password?.message}
							name="password"
							type="password"
							disabled={isLoading}
							label="Contraseña"
							placeholder="gonzalo123*"
							register={register}
						/>
						<button
							type="submit"
							className="p-3 mb-2 text-lg font-medium rounded-xl bg-rose-200  w-96"
							disabled={isLoading}
						>
							{isLoading ? 'Creando...' : 'Crear cuenta'}
						</button>
					</form>
					<img
						src="https://opendoodles.s3-us-west-1.amazonaws.com/reading.svg"
						alt="Ilustración de login"
						height={500}
						width={500}
						className="xl:block hidden"
					/>
				</article>
			)}
		</section>
	)
}
