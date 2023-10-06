import { ReverseGeocodeResult } from './_utils/geolocator/types'

type GlobalCtx = {
	geodata: ReverseGeocodeResult | undefined
	geodataLoading: boolean
	geodataError: Error | undefined
	authState: boolean
	withCoords: boolean
}

export type { GlobalCtx }
