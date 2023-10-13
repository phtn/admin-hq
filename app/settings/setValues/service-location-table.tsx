'use client'

import { useEffect, useState } from 'react'
import { serviceLocationCol } from './columns'
import { DataTable } from './data-table'
import { ServiceLocation } from '@/app/types'
import { useFetchConfig } from '@/app/_utils/hooks/useFetchConfig'
import { Loader } from 'lucide-react'

const ServiceLocationTable = () => {
	const [data, setData] = useState<ServiceLocation[]>([])
	const { config, configLoading } = useFetchConfig()

	useEffect(() => {
		if (config) {
			const serviceLocations = config?.serviceLocations
			setData(serviceLocations)
		}
	}, [config])

	if (configLoading) <Loader className='h-6 animate-spin' />

	return (
		<DataTable
			columns={serviceLocationCol}
			data={data}
		/>
	)
}

export { ServiceLocationTable }
