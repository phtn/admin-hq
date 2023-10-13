import { ServiceLocation } from '../types'

type DashboardAccessUpdateParams = {
	uid: string
	status: boolean
}

type UpdateServiceLocationParams = {
	uid: string
	payload: Partial<ServiceLocation>
}

export type { DashboardAccessUpdateParams, UpdateServiceLocationParams }
