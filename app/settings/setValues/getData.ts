import { useFetchConfig } from '@/app/_utils/hooks/useFetchConfig'
import { ServiceLocation } from '@/app/types'
import { useEffect, useState } from 'react'

const getServiceLocationData = () => {
	const { config } = useFetchConfig()
	const [data, setData] = useState<ServiceLocation[]>([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		const serviceLocations = config?.serviceLocations as ServiceLocation[]
		setData(serviceLocations)
		setLoading(false)
	}, [config])

	return { data, loading }
}

export { getServiceLocationData }
