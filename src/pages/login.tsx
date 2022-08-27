import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { ApiError } from '@supabase/supabase-js'
import { FormField } from '@/components/form/FormField'
import { client } from '@/lib/supabase'

export const signInValidator = z.object({
	email: z
		.string()
		.min(6, { message: 'Campo requerido' })
		.email({ message: 'Formato de email ingresado no válido' }),
	password: z.string().min(5, { message: 'Campo requerido' }),
})
type Credentials = z.infer<typeof signInValidator>
export default function LoginPage() {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<z.infer<typeof signInValidator>>({
		resolver: zodResolver(signInValidator),
	})
	const SignInViaEmail = async ({ email, password }: Credentials) => {
		const loginValues = await client.auth.signIn({ email, password })
		if (loginValues.error) throw new Error(loginValues.error.message)
		return loginValues
	}
	const mutation = useMutation(SignInViaEmail, {
		onError(error: ApiError) {
			return error
		},
	})
	const onSubmit = handleSubmit(async ({ email, password }) => {
		mutation.mutate({ email, password })
	})

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
						label="Correo electrónico"
						register={register}
					/>
					<FormField
						errors={errors.password?.message}
						name="password"
						type="password"
						label="Contraseña"
						register={register}
					/>
					<button
						type="submit"
						className="p-3 mb-2 text-lg font-bold rounded-xl bg-amber  w-96"
					>
						Iniciar sesión
					</button>
					<span className="h-12">{mutation.isError && mutation.error.message}</span>
				</form>
			</article>
		</section>
	)
}
