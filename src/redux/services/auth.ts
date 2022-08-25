import { signInWithEmailAndPassword, UserMetadata } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { api } from './api'

type Credentials = {
	email: string
	password: string
}
type UserResponse = {
	email: string | null
	displayName: string | null
	metadata: UserMetadata
}
export const authApi = api.injectEndpoints({
	endpoints: (build) => ({
		login: build.mutation<UserResponse, Credentials>({
			async queryFn(args) {
				const { user } = await signInWithEmailAndPassword(
					auth,
					args.email,
					args.password
				)
				return {
					data: {
						displayName: user.displayName,
						email: user.email,
						metadata: user.metadata,
					},
				}
			},
		}),
	}),
})
export const { useLoginMutation } = authApi
