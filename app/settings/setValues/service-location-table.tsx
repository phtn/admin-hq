'use client'

import { useEffect, useState } from 'react'
import { serviceLocationCol } from './columns'
import { DataTable } from './data-table'
import { ServiceLocation } from '@/app/types'
import { useFetchConfig } from '@/app/_utils/hooks/useFetchConfig'
import { ServiceLocationTableProps } from './types'

const ServiceLocationTable = ({
	setSelectedItem,
}: ServiceLocationTableProps) => {
	const [data, setData] = useState<ServiceLocation[]>([])
	const { serviceLocations } = useFetchConfig()

	useEffect(() => {
		if (serviceLocations) {
			setData(serviceLocations)
		}
	}, [serviceLocations])

	return (
		<DataTable
			columns={serviceLocationCol}
			data={data}
			setSelectedItem={setSelectedItem}
		/>
	)
}

export { ServiceLocationTable }
