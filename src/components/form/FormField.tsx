import { InputHTMLAttributes } from 'react'
import { UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	register: UseFormRegister<any>
	name: string
	label: string
	errors: string | undefined
}
export function FormField({ errors, label, name, register, ...rest }: Props) {
	return (
		<aside className="flex flex-col justify-center w-96">
			<label className="font-bold">{label}</label>
			<input
				{...register(name)}
				{...rest}
				className="p-3 mb-2 border rounded-xl border-slate-300 ring-0  text-slate-500"
			/>
			<span className="h-6 text-red-500">
				{errors?.length !== 0 ? errors : null}
			</span>
		</aside>
	)
}
