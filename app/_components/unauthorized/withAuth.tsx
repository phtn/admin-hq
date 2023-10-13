// // Create a file named 'withAuth.js'
// import useAuth from '@/app/_utils/hooks/useAuth'
// import { redirect } from 'next/navigation'
// import { ReactElement, useEffect } from 'react'

// const withAuth = (WrappedComponent: ReactElement) => {
// 	const Wrapper = () => {
// 		const { userData, authLoading } = useAuth() // Replace with your own auth context

// 		useEffect(() => {
// 			if (!authLoading && !userData) {
// 				redirect('/')
// 			}
// 		}, [authLoading, userData])

// 		if (authLoading || !userData) {
// 			return null
// 		}

// 		return WrappedComponent
// 	}

// 	return Wrapper
// }

// export default withAuth
