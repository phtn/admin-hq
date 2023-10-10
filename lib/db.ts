import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHJ_DOMAIN,
	databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_SB,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MS_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

const firebase = initializeApp(firebaseConfig)
const db = getFirestore(firebase)

export { firebase, db }
