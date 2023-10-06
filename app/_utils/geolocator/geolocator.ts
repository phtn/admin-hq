'use client'

import { useEffect, useState } from 'react'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Coordinates, ReverseGeocodeResult } from './types'

export function useGeolocator() {
	const [geodata, setGeodata] = useState<ReverseGeocodeResult>()
	const [withCoords, setWithCoords] = useState(false)
	const [geodataError, setGeodataError] = useState<Error>()
	const [geodataLoading, setGeodataLoading] = useState(false)
	const [URL, setURL] = useState<string>('')

	const onError = (error: Error) => {
		setGeodataError(error)
		setGeodataLoading(false)
	}

	const onSuccess = (response: AxiosResponse<ReverseGeocodeResult>) => {
		setGeodata(response.data)
		setGeodataLoading(false)
	}

	const onPosition = (coords: Coordinates) => {
		coords ? setWithCoords(true) : setWithCoords(false)
		const api_key = process.env.NEXT_PUBLIC_MAP_API_KEY
		const { latitude, longitude } = coords
		const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${api_key}`
		setURL(url)
	}

	useEffect(() => {
		setGeodataLoading(true)

		getCoords().then(onPosition).catch(onError)

		const config: AxiosRequestConfig = {
			method: 'get',
			url: URL,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		}

		if (URL) axios(config).then(onSuccess).catch(onError)
	}, [URL])

	return { geodata, geodataError, geodataLoading, withCoords }
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
