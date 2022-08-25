import { useState } from 'react'
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from 'firebase/auth'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormField } from '@/components/form/FormField'
import { auth } from '@/lib/firebase'
import { useNavigate } from 'react-router-dom'

export const signUpValidator = z.object({
	email: z
		.string()
		.min(6, { message: 'Campo requerido' })
		.email({ message: 'Formato de email ingresado no válido' }),
	password: z.string().min(5, { message: 'Campo requerido' }),
})

export default function LoginPage() {
	const [error, setError] = useState(null)
	const navigate = useNavigate()
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<z.infer<typeof signUpValidator>>({
		resolver: zodResolver(signUpValidator),
	})
	const onSubmit = handleSubmit(async ({ email, password }) => {
		const { user } = await createUserWithEmailAndPassword(auth, email, password)
		if (user) navigate('/home', { replace: true })
	})
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
					className="p-3 mb-2 text-lg font-bold rounded-xl bg-slate-400 text-slate-800 w-96"
				>
					Iniciar sesión
				</button>
			</form>
		</section>
	)
}
