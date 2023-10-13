import { useEffect, useState } from 'react'
import { type DocumentSnapshot, doc, onSnapshot } from 'firebase/firestore'
import { AdminConfig, ServiceLocation } from '@/app/types'
import { db } from '@/lib/db'

const useFetchConfig = () => {
	const collectionPath = process.env.NEXT_PUBLIC_ADMIN_COLLECTION as string
	const docId = process.env.NEXT_PUBLIC_ADMIN_DOC_ID as string

	const [config, setConfig] = useState<AdminConfig | null>(null)
	const [configError, setConfigError] = useState<Error>()
	const [configLoading, setConfigLoading] = useState(false)
	const [admins, setAdmins] = useState<string[]>([])
	const [serviceLocations, setServiceLocations] = useState<ServiceLocation[]>(
		[]
	)

	const Err = (error: Error) => {
		setConfigError(error)
		setConfigLoading(false)
	}

	const Ok = (snapshot: DocumentSnapshot) => {
		if (snapshot.exists()) {
			const data = snapshot.data() as AdminConfig
			setConfig(data)
			setAdmins(data.admins)
			setServiceLocations(data.serviceLocations)
			setConfigLoading(false)
		}
	}

	useEffect(() => {
		const docRef = doc(db, collectionPath, docId)
		setConfigLoading(true)
		onSnapshot(docRef, Ok, Err)
	}, [])

	return { admins, config, configError, configLoading, serviceLocations }
}

export { useFetchConfig }
