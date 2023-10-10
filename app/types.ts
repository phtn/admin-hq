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

interface AdminConfig {
	admins: string[]
	businessSizes: IdValuePair[]
	businessTypes: IdValuePair[]
	dashboardAccess: boolean
	industries: IdValuePair[]
	revenueRanges: IdValuePair[]
	taxRegTypes: IdValuePair[]
	serviceLocation: IdValuePair[]
}

export type { GlobalCtx, AdminConfig }
