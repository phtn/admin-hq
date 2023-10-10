'use client'

import { useState, useEffect } from 'react'
import { User, getAuth, onAuthStateChanged } from 'firebase/auth'
import { db, firebase } from '@/lib/db'

const useAuth = () => {
	const auth = getAuth(firebase)
	const [userData, setUserData] = useState<User | null>(null)

	const [authLoading, setAuthLoading] = useState(true)

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setUserData(user)
			setAuthLoading(false)
		})
	}, [userData])

	return { userData, authLoading }
}

export default useAuth
