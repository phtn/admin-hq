'use client'

import { createContext, useCallback, useMemo, useState } from 'react'
import { SignInForm } from './_components/signin/signInForm'
import { Backdrop, Blur, Body } from './styled'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { db } from '@/lib/db'
import { useGeolocator } from './_utils/geolocator/geolocator'
import { map } from './_utils/helpers'
import { GlobalCtx } from './types'
import { Homepage } from './_components/homepage/homepage'

export const GlobalContext = createContext<GlobalCtx | null>(null)

export default function Home() {
	const [authState, setAuthState] = useState(false)
	const { geodata, geodataError, geodataLoading, withCoords } = useGeolocator()

	const auth = getAuth(db)
	onAuthStateChanged(auth, (user) => {
		if (user) setAuthState(true)
	})

	const handleSignOut = () => {
		auth.signOut().then(() => {
			setAuthState(false)
		})
		console.log('sign out pressed')
	}

	const Authenticator = useCallback(() => {
		const gate = map(<Homepage />, <SignInForm />)
		return <>{gate.get(authState)}</>
	}, [authState])

	const context: GlobalCtx = useMemo(
		() => ({
			geodata,
			geodataLoading,
			geodataError,
			authState,
			withCoords,
		}),
		[authState, geodata, geodataLoading, geodataError]
	)

	return (
		<GlobalContext.Provider value={context}>
			<Backdrop>
				<Blur />
			</Backdrop>
			<Body>
				<Authenticator />
			</Body>
		</GlobalContext.Provider>
	)
}
