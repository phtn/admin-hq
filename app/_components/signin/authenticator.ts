import { db } from '@/lib/db'
import {
	User,
	UserCredential,
	getAuth,
	signInWithEmailAndPassword,
} from 'firebase/auth'

type SignInProps = {
	email: string
	password: string
}

const authenticator = async ({ email, password }: SignInProps) => {
	const auth = getAuth(db)

	const onError = (error: Error) => error

	const onSuccess = (userCredential: UserCredential) => {
		const credential = userCredential.user as User
		return credential
	}

	return signInWithEmailAndPassword(auth, email, password)
		.then(onSuccess)
		.catch(onError)
}

export { authenticator }
