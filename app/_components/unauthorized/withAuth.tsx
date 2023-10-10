// Create a file named 'withAuth.js'
import useAuth from '@/app/_utils/hooks/useAuth'
import { redirect } from 'next/navigation'
import { ReactElement, useEffect } from 'react'

const withAuth = (WrappedComponent: ReactElement) => {
	const Wrapper = () => {
		const { userData, authLoading } = useAuth() // Replace with your own auth context

		useEffect(() => {
			if (!authLoading && !userData) {
				// Redirect to login page if the user is not signed in
				redirect('/')
			}
		}, [authLoading, userData])

		if (authLoading || !userData) {
			// You can show a loading spinner or return null while checking authentication status
			return null
		}

		// Render the wrapped component if the user is signed in
		return WrappedComponent
	}

	return Wrapper
}

export default withAuth
