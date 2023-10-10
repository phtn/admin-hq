'use client'
import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useAuth from '../_utils/hooks/useAuth'
import { BigLoader } from './lotties/lotties'

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
	const router = useRouter()
	const { userData, authLoading } = useAuth()

	useEffect(() => {
		if (!authLoading && !userData) {
			router.push('/')
		}
	}, [userData, authLoading, router])

	if (authLoading && !userData) {
		return (
			<div className='flex h-64 items-center justify-center'>
				<BigLoader loop />
			</div>
		)
	}

	return <>{children}</>
}

export default ProtectedRoute
