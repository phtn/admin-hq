import { Separator } from '@/components/ui/separator'
import { AdminForm } from './admin-form'
import { firebase } from '@/lib/db'
import { getAuth } from 'firebase/auth'

export default function SettingsProfilePage() {
	const auth = getAuth(firebase)
	const email = auth.currentUser?.email

	return (
		<div className='space-y-6'>
			<div>
				<h3 className='text-lg font-medium'>Admin</h3>
				<p className='text-sm text-muted-foreground'>{email}</p>
			</div>
			<Separator />
			<AdminForm />
		</div>
	)
}
