import { useEffect, useState } from 'react'
import {
	AuthError,
	ErrorFn,
	signInWithEmailAndPassword,
	User,
} from 'firebase/auth'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormField } from '@/components/form/FormField'
import { auth } from '@/lib/firebase'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '@/redux/services/auth'
import toast from 'react-hot-toast'

export const signInValidator = z.object({
	email: z
		.string()
		.min(6, { message: 'Campo requerido' })
		.email({ message: 'Formato de email ingresado no válido' }),
	password: z.string().min(5, { message: 'Campo requerido' }),
})

export default function LoginPage() {
	const [loginUser, result] = useLoginMutation()

	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<z.infer<typeof signInValidator>>({
		resolver: zodResolver(signInValidator),
	})
	const navigate = useNavigate()
	const onSubmit = handleSubmit(async (values) => {
		const loginValues = { ...values, auth }
		await loginUser(loginValues)
		const errorType: AuthError | undefined = result.error as AuthError

		if (result.isError) toast.error(errorType.message)
	})
	if (result.data) navigate('/home/main')

	return (
		<section className="grid place-items-center">
			<form
				onSubmit={onSubmit}
				className="flex flex-col items-center justify-center space-y-2 container mx-auto"
			>
				<FormField
					errors={errors.email?.message}
					name="email"
					label="Correo electrónico"
					disabled={result.isLoading}
					register={register}
				/>
				<FormField
					errors={errors.password?.message}
					name="password"
					type="password"
					disabled={result.isLoading}
					label="Contraseña"
					register={register}
				/>
				<button
					type="submit"
					className="p-3 mb-2 text-lg font-bold rounded-xl bg-slate-400 text-slate-800 w-96"
					disabled={result.isLoading}
				>
					{result.isLoading ? 'Iniciando...' : 'Iniciar sesión'}
				</button>
			</form>
		</section>
	)
}
