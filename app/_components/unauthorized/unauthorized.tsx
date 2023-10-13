'use client'

import { Looper } from '../lotties/lotties'
import { useGeolocator } from '@/app/_utils/geolocator/geolocator'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableRow,
} from '@/components/ui/table'
import { Crosshair } from 'lucide-react'

export const Unauthorized = () => {
	const { pinPoint } = useGeolocator()

	return (
		<div className=' flex flex-col mt-6 items-center justify-center'>
			<div className='flex items-center my-3'>
				<Looper
					lg
					data='globe'
				/>
				<span className='text-lg font-bold tracking-tight ml-3'>
					Unauthorized Access.
				</span>
			</div>

			<div className='flex flex-col items-center justify-center my-6'>
				<Table className='w-[250px] border border-stone-500 self-center'>
					<TableCaption>
						<div className='flex items-center justify-center font-medium text-destructive'>
							Location acquired.
							<Crosshair className='h-[16px] mx-2 text-red-600 animate-pulse' />
						</div>
					</TableCaption>

					<TableBody className='bg-background'>
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
