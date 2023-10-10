import { db } from '@/lib/db'
import {
	DocumentSnapshot,
	arrayUnion,
	doc,
	updateDoc,
} from 'firebase/firestore'
import { AdminConfig } from '../types'
import { toast } from 'sonner'

type DashboardAccessUpdateParams = {
	uid: string
	status: boolean
}

const POST_DashboardAccessUpdate = ({
	uid,
	status,
}: DashboardAccessUpdateParams) => {
	const collectionPath = process.env.NEXT_PUBLIC_ADMIN_COLLECTION as string
	const docId = process.env.NEXT_PUBLIC_ADMIN_DOC_ID as string
	const docRef = doc(db, collectionPath, docId)
	const access = status ? 'Access Enabled' : 'Access Disabled'

	const Err = (error: Error) => {
		toast(`⚠️ Error updating: ${error.message}`)
	}

	const Ok = () => {
		toast(`✓  Update: ${access}`)
	}

	const payload = {
		dashboardAccess: status,
		logs: arrayUnion({
			createdAt: Date.now(),
			type: 'dashboard_access',
			user: uid,
			value: access,
		}),
	}

	return updateDoc(docRef, {
		...payload,
	}).then(Ok, Err)
}

export { POST_DashboardAccessUpdate }
