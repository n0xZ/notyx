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
		reset,
	} = useForm<z.infer<typeof signUpValidator>>({
		resolver: zodResolver(signUpValidator),
	})
	const { isLoading, isSuccess, needsEmailVerification, signUpEmailPassword } =
		useSignUpEmailPassword()
	const onSubmit = handleSubmit(async ({ email, password }) => {
		await signUpEmailPassword(email, password)
	})
	if (isSuccess) return <Navigate to="/home/main" replace={true} />
	return (
		<section className="grid place-items-center h-full min-h-screen">
			<article className=" container mx-auto ">
				{needsEmailVerification ? (
					<p>Por favor, revise su correo para confirmar su cuenta.</p>
				) : (
					<form
						onSubmit={onSubmit}
						className="flex flex-col items-center justify-center space-y-2 container mx-auto"
					>
						<FormField
							errors={errors.email?.message}
							disabled={isLoading}
							name="email"
							label="Correo electrónico"
							register={register}
						/>
						<FormField
							errors={errors.password?.message}
							name="password"
							type="password"
							disabled={isLoading}
							label="Contraseña"
							register={register}
						/>
						<button
							type="submit"
							className="p-3 mb-2 text-lg font-bold rounded-xl bg-amber  w-96"
							disabled={isLoading}
						>
							Crear nueva cuenta
						</button>
					</form>
				)}
			</article>
		</section>
	)
}
