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
import {
	DashboardAccessUpdateParams,
	UpdateServiceLocationParams,
} from './post.types'

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
		toast(`✅   Add Successful`)
	}

	const serviceLocations = arrayUnion({
		...payload,
		id: count - 1,
		createdAt: Date.now(),
		updatedAt: Date.now(),
	})

	return updateDoc(docRef, { serviceLocations }).then(Ok, Err)
}

const POST_UpdateServiceLocation = async ({
	uid,
	payload,
}: UpdateServiceLocationParams) => {
	const Err = (error: Error) => {
		toast(`⚠️️ Error updating item: ${error.message}`)
	}

	const Ok = () => {
		toast(`✅   Update Successful`)
	}

	const OkGet = (snapshot: DocumentSnapshot) => {
		if (snapshot.exists()) {
			const arrayField = snapshot.data().serviceLocations as ServiceLocation[]

			const updatedArray = arrayField.map((item) => {
				if (item.id === payload.id) {
					return {
						...item,
						...payload,
						user: uid,
						updatedAt: Date.now(),
					}
				}
				return item
			})

			updateDoc(doc(db, collectionPath, docId), {
				serviceLocations: updatedArray,
			}).then(Ok, Err)
		} else {
			toast(`⚠️️  Error: Document does not exist.`)
		}
	}
	getDoc(doc(db, collectionPath, docId)).then(OkGet, Err)
}

const POST_DeleteServiceLocation = (id: number) => {
	const document = doc(db, collectionPath, docId)

	const Err = (error: Error) => {
		toast(`⚠️️ Error updating item: ${error.message}`)
	}

	const Ok = () => {
		toast(`✅   Delete Successful`)
	}
	const OkGet = (snapshot: DocumentSnapshot) => {
		if (snapshot.exists()) {
			const arrayField = snapshot.data().serviceLocations as ServiceLocation[]
			const serviceLocations = arrayField.filter((item) => item.id !== id)
			updateDoc(document, { serviceLocations }).then(Ok, Err)
		}
	}

	getDoc(document).then(OkGet, Err)
}

export {
	POST_AddServiceLocation,
	POST_DashboardAccessUpdate,
	POST_DeleteServiceLocation,
	POST_UpdateServiceLocation,
}
