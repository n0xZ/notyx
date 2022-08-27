import { NhostClient } from '@nhost/react'

export const nhost = new NhostClient({
	subdomain: import.meta.env.VITE_NHOST_SUBDOMAIN!,
	region: import.meta.env.VITE_NHOST_REGION!,
})
