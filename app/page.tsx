'use client'

import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { SignInForm } from './_components/signin/signInForm'
import { Backdrop, Blur, Body } from './styled'
import { useGeolocator } from './_utils/geolocator/geolocator'
import { map } from './_utils/helpers'
import { GlobalCtx } from './types'
import { Homepage } from './_components/homepage/homepage'
import useAuth from './_utils/hooks/useAuth'
import { useFetchConfig } from './_utils/hooks/useFetchConfig'

export const GlobalContext = createContext<GlobalCtx | null>(null)

export default function Home() {
	const { geodata, geodataError, geodataLoading, withCoords } = useGeolocator()
	const { userData } = useAuth()
	const { config } = useFetchConfig()

	const [authState, setAuthState] = useState(false)
	const [ctx, setCtx] = useState<GlobalCtx>({} as GlobalCtx)

	useEffect(() => {
		const isAuthorized = userData !== null
		setAuthState(isAuthorized)
	}, [userData])

	const Authenticator = useCallback(() => {
		const gate = map(<Homepage />, <SignInForm />)
		return <>{gate.get(authState)}</>
	}, [authState])

	useEffect(() => {
		const context: GlobalCtx = {
			geodata,
			geodataLoading,
			geodataError,
			withCoords,
			config,
			userData,
		}

		setCtx(context)
	}, [geodata, geodataLoading, geodataError, withCoords, config, userData])

	return (
		<GlobalContext.Provider value={ctx as GlobalCtx}>
			<Backdrop>
				<Blur />
			</Backdrop>
			<Body>
				<Authenticator />
			</Body>
		</GlobalContext.Provider>
	)
}
