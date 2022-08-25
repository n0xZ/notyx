import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const API_KEY = import.meta.env.VITE_API_KEY!
const AUTH_DOMAIN = import.meta.env.VITE_AUTH_DOMAIN!
const PROJECT_ID = import.meta.env.VITE_PROJECT_ID!
const STORAGE_BUCKET = import.meta.env.VITE_STORAGE_BUCKET!
const MESSAGING_SENDER_ID = import.meta.env.VITE_MESSAGING_SENDER_ID!
const APP_ID = import.meta.env.VITE_APP_ID!
const MEASUREMENT_ID = import.meta.env.VITE_MEASUREMENT_ID!
const firebaseConfig = {
	apiKey: API_KEY,
	authDomain: AUTH_DOMAIN,
	projectId: PROJECT_ID,
	storageBucket: STORAGE_BUCKET,
	messagingSenderId: MESSAGING_SENDER_ID,
	appId: APP_ID,
	measurementId: MEASUREMENT_ID,
}

// Initialize Firebase
const firebase = initializeApp(firebaseConfig)

export const auth = getAuth(firebase)
export const DB = getFirestore(firebase)
