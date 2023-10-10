'use client'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useAuth from '../_utils/hooks/useAuth'
import { BigLoader } from './lotties/lotties'
import { useFetchConfig } from '../_utils/hooks/useFetchConfig'
import { map } from '../_utils/helpers'
import { Unauthorized } from './unauthorized/unauthorized'

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
	const router = useRouter()
	const { userData, authLoading } = useAuth()
	const { config, configLoading } = useFetchConfig()

	const [uid, setUid] = useState<string>()
	const [admins, setAdmins] = useState<string[]>([])

	useEffect(() => {
		if (userData) {
			setUid(userData?.uid)
		}
		if (config) {
			setAdmins(config?.admins)
		}

		if (!authLoading && !userData) {
			router.push('/')
		}
	}, [userData, authLoading, config, configLoading, router])

	const AccessOptions = useCallback(() => {
		const authorization = admins.includes(uid as string)
		const options = map(<>{children}</>, <Unauthorized />)
		return <>{options.get(authorization)}</>
	}, [userData, config, admins, uid])

	const Loading = useCallback(() => {
		const loading = authLoading && configLoading && !uid && !admins.length
		const options = map(
			<div className='flex h-64 items-center justify-center'>
				<BigLoader loop />
			</div>,
			<AccessOptions />
		)
		return <>{options.get(loading)}</>
	}, [authLoading, configLoading, uid, admins, userData, config])

	return (
		<>
			<Loading />
		</>
	)
}

export default ProtectedRoute
