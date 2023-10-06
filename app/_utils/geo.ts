'use client'

import { useEffect, useState } from 'react'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

interface ReverseGeocodeResult {
	type: string
	features: Features[]
	query: {
		lat: number
		lon: number
		plus_code: string
	}
}
interface Features {
	type: string
	properties: Properties
	geometry: Geometry
	bbox: number[]
}

interface Properties {
	datasource: DataSource
	name: string
	country: string
	country_code: string
	state: string
	county: string
	city: string
	postcode: string
	district: string
	suburb: string
	quarter: string
	street: string
	lon: number
	lat: number
	distance: number
	result_type: string
	formatted: string
	address_line1: string
	address_line2: string
	timezone: Timezone
	plus_code: string
	rank: Rank
	place_id: string
}

interface DataSource {
	sourcename: string
	attribition: string
	license: string
	url: string
}

interface Timezone {
	name: string
	offset_STD: string
	offset_STD_seconds: number
	offset_DST: string
	offset_DST_seconds: number
	abbreviation_STD: string
	abbreviation_DST: string
}

interface Rank {
	importance: number
	popularity: number
}

interface Geometry {
	typep: string
	coordinates: number[]
}

type Coordinates = {
	latitude: number
	longitude: number
}

export function useGeolocator() {
	const [geodata, setGeodata] = useState<ReverseGeocodeResult>()
	const [error, setError] = useState<Error>()
	const [loading, setLoading] = useState(false)
	const [URL, setURL] = useState<string>('')

	const onError = (error: Error) => {
		setError(error)
		setLoading(false)
	}

	useEffect(() => {
		setLoading(true)

		const api_key = process.env.NEXT_PUBLIC_MAP_API_KEY
		getCoords()
			.then((coords) => {
				const { latitude, longitude } = coords
				const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${api_key}`
				setURL(url)
			})
			.catch((err) => console.log(err))

		const config: AxiosRequestConfig = {
			method: 'get',
			url: URL,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		}
		const getGeodata = () => {
			axios(config)
				.then((response: AxiosResponse<ReverseGeocodeResult>) => {
					setGeodata(response.data)
					setLoading(false)
				})
				.catch(onError)
		}
		if (URL) {
			console.log(URL)
			getGeodata()
		}
	}, [URL])

	return { geodata, error, loading }
}

const getCoords = (): Promise<Coordinates> => {
	return new Promise((resolve, reject) => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords

					resolve({ latitude, longitude })
				},
				(error) => {
					reject(error)
				}
			)
		} else {
			reject(new Error('Geolocation is not supported by this browser.'))
		}
	})
}

/*

geoapify
https://api.geoapify.com/v1/geocode/reverse?lat=51.21709661403662&lon=6.7782883744862374&apiKey=a4e0225ab13f4cab9e5c5b7626d6f90c

https://api.geoapify.com/v1/geocode/reverse?lat=14.750379464258843&lon=121.06671895912332&apiKey=a4e0225ab13f4cab9e5c5b7626d6f90c
*/
