import { User } from 'firebase/auth'
import { ReverseGeocodeResult } from './_utils/geolocator/types'

type GlobalCtx = {
	geodata: ReverseGeocodeResult | undefined
	geodataLoading: boolean
	geodataError: Error | undefined
	withCoords: boolean
	config: AdminConfig | null
	userData: User | null
}

type IdValuePair = {
	id: number
	value: string
}

type Log = {
	createdAt: number
	type: string
	user: string
	value: string
}

type ServiceLocation = {
	createdAt: number
	id: number
	region: string
	value: string
	updatedAt: number
	user: string
}

interface AdminConfig {
	admins: string[]
	businessSizes: IdValuePair[]
	businessTypes: IdValuePair[]
	dashboardAccess: boolean
	industries: IdValuePair[]
	revenueRanges: IdValuePair[]
	taxRegTypes: IdValuePair[]
	serviceLocations: ServiceLocation[]
	logs: Log[]
}

export type { GlobalCtx, AdminConfig, ServiceLocation }
