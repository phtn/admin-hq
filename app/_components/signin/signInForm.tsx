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
import { GreenCheck, OrbLoader, SmallLoader } from '../lotties/lotties'
import { useCallback, useContext, useEffect, useState } from 'react'
import { GlobalContext } from '@/app/page'
import { GlobalCtx } from '@/app/types'
import { toast } from 'sonner'
import { map } from '@/app/_utils/helpers'
import { authenticator } from './authenticator'
import { type User } from 'firebase/auth'

const formSchema = z.object({
	email: z.string().email().min(1, {
		message: 'Username must be at least 2 characters.',
	}),
	password: z.string().min(4, {
		message: 'Username must be at least 2 characters.',
	}),
})

export function SignInForm() {
	const Context = useContext(GlobalContext)
	const { geodata, geodataError, geodataLoading } = Context as GlobalCtx
	const [error, setError] = useState<Error>()
	const [loading, setLoading] = useState(false)
	const [userCity, setUserCity] = useState('')

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		const onError = (error: Error) => {
			setError(error as Error)
		}
		const onSuccess = (value: User | Error) => {
			console.log(value as User)
		}
		authenticator(values).then(onSuccess).catch(onError)
	}

	useEffect(() => {
		setLoading(geodataLoading)
		if (geodata) {
			const features = geodata.features[0]
			const city = features.properties.city
			setUserCity(city)
		}
		return () => {
			setError(geodataError)
		}
	}, [geodata])

	useEffect(
		function getCity() {
			toast(<span className='font-bold'>{userCity}</span>, {
				description: 'desc',
			})
		},
		[userCity]
	)

	useEffect(() => {
		toast(<span>{error?.message}</span>)
	}, [error])

	const Loader = useCallback(() => {
		const options = map(<GreenCheck loop={false} />, <SmallLoader loop />)
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
								<Loader />
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
