'use client'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { TabsContent } from '@/components/ui/tabs'
import { ServiceLocationTable } from './service-location-table'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Description, SL_Container, Title } from './styled'
import { InputFieldProps } from './types'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { POST_AddServiceLocation } from '@/app/_api/post'
import { useCallback, useState } from 'react'
import { Form } from '@/components/ui/form'
import { FieldProps, InputField, Submit } from '../_components/form_components'
import { firebase } from '@/lib/db'
import { getAuth } from 'firebase/auth'

const serviceLocationSchema = z.object({
	region: z.string().min(1, {
		message: 'This field is required.',
	}),
	city: z.string().min(1, {
		message: 'This field is required.',
	}),
})

type ServiceLocationFormValues = z.infer<typeof serviceLocationSchema>

const defaultValues: Partial<ServiceLocationFormValues> = {
	region: 'Metro Manila',
}

const ServiceLocationPanel = () => {
	const [loading, setLoading] = useState(false)
	const auth = getAuth(firebase)

	const form = useForm<ServiceLocationFormValues>({
		resolver: zodResolver(serviceLocationSchema),
		defaultValues,
	})

	const {
		control,
		formState: { isDirty },
		reset,
		handleSubmit,
	} = form

	const onSubmit = (data: ServiceLocationFormValues) => {
		setLoading(true)
		const uid = auth.currentUser?.uid
		const value = data.city

		if (isDirty) {
			POST_AddServiceLocation({ value, region: data.region, user: uid }).then(
				() => {
					reset({ city: '' })
					setLoading(false)
				}
			)
		}
	}

	const Field = useCallback(
		(props: FieldProps<ServiceLocationFormValues>) => <InputField {...props} />,
		[loading]
	)

	return (
		<TabsContent value='serviceLocations'>
			<SL_Container>
				<Card className='col-span-1'>
					<CardHeader>
						<Title>Add Service Locations</Title>
						<Description>Add, edit or delete service locations.</Description>
					</CardHeader>
					<Form {...form}>
						<form
							name='service-location-form'
							onSubmit={handleSubmit(onSubmit)}>
							<CardContent className='space-y-2'>
								<Field
									control={control}
									fieldName='region'
									defaultValue='Metro Manila'
									description=''
									isDirty={isDirty}
									label='Region'
									placeholder='Metro Manila'
								/>

								<Field
									control={control}
									fieldName='city'
									defaultValue=''
									description=''
									isDirty={isDirty}
									label='City'
									placeholder='City'
									loading={loading}
								/>
							</CardContent>
							<CardFooter>
								<Submit
									status={!isDirty}
									label='Add Item'
									loading={loading}
								/>
							</CardFooter>
						</form>
					</Form>
				</Card>
				<div className='col-span-3'>
					<ServiceLocationTable />
				</div>
			</SL_Container>
		</TabsContent>
	)
}

export { ServiceLocationPanel }
