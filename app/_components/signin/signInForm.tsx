'use client'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { map } from '@/app/_utils/helpers'
import { authenticator } from './authenticator'
import { type User } from 'firebase/auth'
import { MapPinIcon } from 'lucide-react'
import { useGeolocator } from '@/app/_utils/geolocator/geolocator'
import { Looper } from '../lotties/lotties'

const formSchema = z.object({
	email: z.string().email().min(1, {
		message: 'Username must be at least 2 characters.',
	}),
	password: z.string().min(4, {
		message: 'Password required.',
	}),
	secret: z.string().min(4, {
		message: 'Enter your secret key.',
	}),
})

export function SignInForm() {
	const { geodata, geodataError, geodataLoading } = useGeolocator()
	const [error, setError] = useState<Error>()
	const [loading, setLoading] = useState(false)
	const [userCity, setUserCity] = useState('')
	const [userStreet, setUserStreet] = useState('')

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
			secret: '',
		},
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true)
		const onError = (error: Error) => {
			toast(<span>{error.message}</span>)
			setError(error)
			setLoading(false)
		}

		const onResult = (value: User | Error) => {
			if (Object.values(value)[2] === 'FirebaseError') {
				onError(value as Error)
			} else {
				toast(<span>Successful login.</span>)

				setLoading(false)
			}
		}
		authenticator(values).then(onResult)
	}

	useEffect(() => {
		setLoading(geodataLoading)
		if (geodata) {
			const features = geodata.features[0]
			const city = features.properties.city
			const street = features.properties.address_line1
			setUserCity(city)
			setUserStreet(street)
		}
		return () => {
			setError(geodataError)
		}
	}, [])

	useEffect(() => {
		if (userCity) {
			toast(
				<div className='flex items-center'>
					<MapPinIcon className='mr-3 h-4 stroke-[1px]' />
					<span className='font-bold'>{userCity}</span>
				</div>
			)
		}
	}, [userCity])

	const Loader = useCallback(() => {
		const options = map(
			<Looper
				xs
				data='greenCheck'
			/>,
			<Looper
				md
				data='globe'
			/>
		)
		return <>{options.get(!loading)}</>
	}, [loading])

	return (
		<div className='justify-center h-[500px] flex mt-8 lg:mt-16'>
			<div className='min-w-[320px]'>
				<div className='p-8 bg-background'>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='space-y-4'>
							<div className='flex justify-between items-center h-12'>
								<span className='flex text-lg text-stone-700 font-extrabold tracking-tighter '>
									Sign in.
								</span>
								<div className='flex items-center'>
									<div className='flex flex-col mx-3 p-0'>
										<span className='text-[10px] leading-tightf'>
											{userStreet}
										</span>
										<span className='text-[12px] font-bold leading-tight'>
											{userCity}
										</span>
									</div>
									<Loader />
								</div>
							</div>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												placeholder='User ID'
												{...field}
												type='email'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												placeholder='Password'
												{...field}
												type='password'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='secret'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												placeholder='Secret key'
												{...field}
												type='password'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button
								disabled={loading}
								type='submit'
								variant='submit'
								size='fat'
								className='w-full'>
								Submit
							</Button>
						</form>
					</Form>
				</div>
			</div>
		</div>
	)
}
