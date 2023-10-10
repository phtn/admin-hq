'use client'
import { Separator } from '@/components/ui/separator'
import { AdminForm } from './admin-form'
import ProtectedRoute from '../_components/protectedRoutes'
import { firebase } from '@/lib/db'
import { getAuth } from 'firebase/auth'
import { useFetchConfig } from '../_utils/hooks/useFetchConfig'

export default function SettingsProfilePage() {
	const auth = getAuth(firebase)
	const { config } = useFetchConfig()

	const uid = auth.currentUser?.uid
	const email = auth.currentUser?.email

	return (
		<ProtectedRoute>
			<div className='space-y-6'>
				<div>
					<h3 className='text-lg font-medium'>Admin</h3>
					<p className='text-sm text-muted-foreground'>{email}</p>
				</div>
				<Separator />
				<AdminForm />
			</div>
		</ProtectedRoute>
	)
}
