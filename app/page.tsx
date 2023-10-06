'use client'

import { useCallback, useEffect, useState } from 'react'
import { SignInForm } from './_components/signin/signInForm'
import { Backdrop, Blur, Body } from './styled'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { db } from '@/lib/db'
import { useGeolocator } from './_utils/geo'
import { map } from './_utils/helpers'

export default function Home() {
	const [authState, setAuthState] = useState(false)
	const { geodata, loading } = useGeolocator()

	const auth = getAuth(db)
	onAuthStateChanged(auth, (user) => {
		if (user) setAuthState(true)
	})

	useEffect(() => {
		console.log(authState)
	}, [authState])

	useEffect(() => {
		console.log(geodata)
	}, [geodata])

	const Authenticator = useCallback(() => {
		const gate = map(<span>Signed in</span>, <SignInForm />)
		return <>{gate.get(authState)}</>
	}, [authState])

	return (
		<>
			<Backdrop>
				<Blur></Blur>
			</Backdrop>
			<Body>
				<Authenticator />
			</Body>
		</>
	)
}
