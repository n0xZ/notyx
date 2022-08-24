import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormField } from '../components/form/FormField'
import { FirebaseAuth } from '@/lib/firebase'

export const signInValidator = z.object({
	username: z.string().min(3, { message: 'Campo requerido' }),
	password: z.string().min(5, { message: 'Campo requerido' }),
})

export default function LoginPage() {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<z.infer<typeof signInValidator>>({
		resolver: zodResolver(signInValidator),
	})
	const onSubmit = handleSubmit((values) => {
		console.log(values)
	})
	return (
		<section className="grid place-items-center">
			<form
				onSubmit={onSubmit}
				className="flex flex-col items-center justify-center space-y-2 container mx-auto"
			>
				<FormField
					errors={errors.username?.message}
					name="username"
					label="Nombre de usuario"
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
