'use client'

import { Separator } from '@/components/ui/separator'
import { Warning } from '../lotties/lotties'
import { useGeolocator } from '@/app/_utils/geolocator/geolocator'
import { useEffect, useState } from 'react'
import { PinPoint } from '@/app/_utils/geolocator/types'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Crosshair, Lock } from 'lucide-react'

export const Unauthorized = () => {
	const { crosshair } = useGeolocator()
	const [pinPoint, setPinPoint] = useState<PinPoint>()

	useEffect(() => {
		if (crosshair) {
			setPinPoint(crosshair)
		}
	}, [crosshair])

	return (
		<div className=' flex flex-col mt-6 items-center justify-center'>
			<div className='flex items-center my-3'>
				<Warning loop />
				<span className='text-lg font-bold tracking-tight ml-3'>
					Unauthorized Access.
				</span>
			</div>
			<Separator className='w-1/3 bg-stone-500' />

			<div className='flex flex-col items-center justify-center my-6'>
				<Table className='w-[250px] border border-stone-500 self-center'>
					<TableCaption>
						<div className='flex items-center justify-center font-bold'>
							Location acquired.{' '}
							<Crosshair className='h-[16px] mx-2 text-red-600' />{' '}
						</div>
					</TableCaption>

					<TableBody>
						<TableRow className='h-2'>
							<TableCell className='w-[100px] font-medium'>St</TableCell>
							<TableCell className='w-[150px]'>{pinPoint?.street}</TableCell>
						</TableRow>
						<TableRow className='h-2'>
							<TableCell className='w-[100px] font-medium'>Quarter</TableCell>
							<TableCell className='w-[150px]'>{pinPoint?.quarter}</TableCell>
						</TableRow>
						<TableRow className='h-2'>
							<TableCell className='w-[100px] font-medium'>Suburb</TableCell>
							<TableCell className='w-[150px]'>{pinPoint?.suburb}</TableCell>
						</TableRow>
						<TableRow className='h-2'>
							<TableCell className='w-[100px] font-medium'>City</TableCell>
							<TableCell className='w-[150px]'>{pinPoint?.city}</TableCell>
						</TableRow>
						<TableRow className='h-2'>
							<TableCell className='w-[100px] font-medium'>State</TableCell>
							<TableCell className='w-[150px]'>{pinPoint?.state}</TableCell>
						</TableRow>
						<TableRow className='h-2'>
							<TableCell className='w-[100px] font-medium'>PostCode</TableCell>
							<TableCell className='w-[150px]'>{pinPoint?.code}</TableCell>
						</TableRow>
						<TableRow className='h-2'>
							<TableCell className='w-[100px] font-medium'>Country</TableCell>
							<TableCell className='w-[150px] uppercase'>
								{pinPoint?.country}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>
		</div>
	)
}
