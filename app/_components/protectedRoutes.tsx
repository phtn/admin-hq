'use client'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import useAuth from '../_utils/hooks/useAuth'
import { Looper } from './lotties/lotties'
import { map } from '../_utils/helpers'
import { Unauthorized } from './unauthorized/unauthorized'
import { SignInForm } from './signin/signInForm'
import { VerifyAccess } from './signin/verifyAccess'

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
	const { userData, authLoading } = useAuth()

	const authorization = VerifyAccess(userData?.uid as string)

	const AccessOptions = useCallback(() => {
		const options = map(<>{children}</>, <Unauthorized />)
		return <>{options.get(authorization as boolean)}</>
	}, [userData, authorization])

	const AuthOptions = useCallback(() => {
		const isAuth = userData !== null
		const options = map(<AccessOptions />, <SignInForm />)
		return <>{options.get(isAuth)}</>
	}, [userData])

	const Initial = useCallback(() => {
		const options = map(
			<div className='flex h-64 items-center justify-center'>
				<Looper
					md
					data='globe'
				/>
			</div>,
			<AuthOptions />
		)
		return <>{options.get(authLoading)}</>
	}, [authLoading, authorization, userData])

	return <Initial />
}

export default ProtectedRoute
