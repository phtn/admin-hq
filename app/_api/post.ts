import { db } from '@/lib/db'
import {
	DocumentSnapshot,
	arrayUnion,
	doc,
	getDoc,
	updateDoc,
} from 'firebase/firestore'
import { AdminConfig, ServiceLocation } from '../types'
import { toast } from 'sonner'

type DashboardAccessUpdateParams = {
	uid: string
	status: boolean
}

const collectionPath = process.env.NEXT_PUBLIC_ADMIN_COLLECTION as string
const docId = process.env.NEXT_PUBLIC_ADMIN_DOC_ID as string

const POST_DashboardAccessUpdate = ({
	uid,
	status,
}: DashboardAccessUpdateParams) => {
	const docRef = doc(db, collectionPath, docId)
	const access = status ? 'Access Enabled' : 'Access Disabled'

	const Err = (error: Error) => {
		toast(`⚠️️ Error updating: ${error.message}`)
	}

	const Ok = () => {
		toast(`✅  Update: ${access}`)
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

const POST_AddServiceLocation = async (payload: Partial<ServiceLocation>) => {
	const docRef = doc(db, collectionPath, docId)

	const count = await getDoc(docRef).then((doc) => doc.data.length)

	const Err = (error: Error) => {
		toast(`⚠️️ Error while add: ${error.message}`)
	}

	const Ok = () => {
		toast(`✅  Add Successful`)
	}

	const serviceLocations = arrayUnion({
		...payload,
		id: count - 1,
		createdAt: Date.now(),
		updatedAt: Date.now(),
	})

	return updateDoc(docRef, { serviceLocations }).then(Ok, Err)
}

export { POST_DashboardAccessUpdate, POST_AddServiceLocation }
