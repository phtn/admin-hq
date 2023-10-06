'use client'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
	username: z.string().email().min(2, {
		message: 'Username must be at least 2 characters.',
	}),
	password: z.string().min(4, {
		message: 'Username must be at least 2 characters.',
	}),
	secret: z.number().min(4, {
		message: 'Username must be at least 2 characters.',
	}),
})

export function SignInForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
			password: '',
			secret: 0,
		},
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values)
	}

	return (
		<div className='items-center justify-center flex  h-[90%]'>
			<div className=' border min-w-[320px] p-8 bg-background'>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-6'>
						<span className='text-lg text-stone-700 font-extrabold tracking-tighter '>
							Sign in.
						</span>
						<FormField
							control={form.control}
							name='username'
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
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							disabled
							type='submit'
							className='w-full'>
							Submit
						</Button>
					</form>
				</Form>
			</div>
		</div>
	)
}
