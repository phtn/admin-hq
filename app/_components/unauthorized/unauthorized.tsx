'use client'

import { useEffect } from 'react'
import { Warning } from '../lotties/lotties'
import { redirect } from 'next/navigation'
import { getAuth } from 'firebase/auth'
import { db } from '@/lib/db'

const auth = getAuth(db)

export const Unauthorized = () => {
	console.log(auth.currentUser?.email !== null)
	useEffect(() => {
		// redirect('/')
	}, [])
	return (
		<div className=' flex flex-col h-96 items-center justify-center'>
			<div className='flex'>
				<Warning loop={false} />
				<span className='text-md font-bold tracking-tight ml-3'>
					Unauthorized!
				</span>
			</div>
			<span className='my-6 text-sm'>Redirecting...</span>
		</div>
	)
}
