import { InputHTMLAttributes } from 'react'
import { UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	register: UseFormRegister<any>
	name: string
	label: string
	errors: string | undefined
}
export function FormField({
	errors,
	label,
	name,
	register,
	type,
	...rest
}: Props) {
	return (
		<aside className="flex flex-col justify-center w-96 mt-4">
			<label className="font-medium">{label}</label>
			{type === 'text' || type === 'password' || type === 'email' ? (
				<input
					{...register(name)}
					{...rest}
					className="p-3 mb-2 border rounded-lg  bg-rose-200 border-rose-300 ring-rose-200 ring-0  text-slate-500"
				/>
			) : (
				<textarea
					{...register(name)}
					className="p-3 mb-2 border rounded-lg h-28 bg-rose-200 border-rose-300 ring-rose-200 ring-0  text-slate-500"
				/>
			)}
			<span className="h-6 text-red-600">
				{errors?.length !== 0 ? errors : null}
			</span>
		</aside>
	)
}
