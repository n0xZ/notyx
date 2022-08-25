import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
	reducerPath: 'baseReducer',
	baseQuery: fakeBaseQuery(),
	tagTypes: ['Auth', 'Notes'],
	endpoints: () => ({}),
})
