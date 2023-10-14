'use client'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { TabsContent } from '@/components/ui/tabs'
import { ServiceLocationTable } from './service-location-table'
import { Description, SL_Container, Title } from './styled'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	POST_AddServiceLocation,
	POST_DeleteServiceLocation,
	POST_UpdateServiceLocation,
} from '@/app/_api/post'
import { useCallback, useEffect, useState } from 'react'
import { Form } from '@/components/ui/form'
import { FieldProps, InputField, Submit } from '../_components/form_components'
import { firebase } from '@/lib/db'
import { getAuth } from 'firebase/auth'
import { Separator } from '@/components/ui/separator'
import { useFetchConfig } from '@/app/_utils/hooks/useFetchConfig'
import { Badge } from '@/components/ui/badge'
import { ServiceLocation } from '@/app/types'
import { ActiveButton } from '../_components/buttons'
import { EditActionsProps } from './types'
import { map } from '@/app/_utils/helpers'

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
	const [selectedItem, setSelectedItem] = useState<
		ServiceLocation | undefined
	>()
	const [editMode, setEditMode] = useState(false)
	const { serviceLocations } = useFetchConfig()
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

	useEffect(() => {
		console.log(selectedItem?.id)
		if (selectedItem) {
			setEditMode(true)
			reset({ region: selectedItem.region, city: selectedItem.value })
		}
	}, [selectedItem])

	const onSubmit = (data: ServiceLocationFormValues) => {
		console.log('click')
		setLoading(true)
		const uid = auth.currentUser?.uid
		const id = selectedItem?.id
		const region = data.region
		const value = data.city

		if (isDirty && !editMode) {
			POST_AddServiceLocation({ value, region, user: uid }).then(() => {
				reset({ city: '', region: 'Metro Manila' })
				setLoading(false)
			})
		} else if (isDirty && editMode) {
			POST_UpdateServiceLocation({
				uid: uid as string,
				payload: { id, value, region },
			}).then(() => {
				reset({ city: '', region: 'Metro Manila' })
				setLoading(false)
				setEditMode(false)
			})
		} else {
			setLoading(false)
		}
	}

	const handleDeleteRow = () => {
		POST_DeleteServiceLocation(selectedItem?.id as number)
		reset({ city: '', region: 'Metro Manila' })
		setLoading(false)
	}

	useEffect(() => {
		console.log(isDirty)
	}, [isDirty])

	const Field = useCallback(
		(props: FieldProps<ServiceLocationFormValues>) => <InputField {...props} />,
		[loading]
	)

	const Actions = useCallback(() => {
		const options = map(
			<EditActions
				loading={loading}
				isDirty={isDirty}
				onClick={handleDeleteRow}
			/>,
			<Submit
				status={isDirty}
				label={'Add Item'}
				loading={loading}
			/>
		)
		return <>{options.get(editMode)}</>
	}, [editMode, isDirty, loading])

	return (
		<TabsContent value='serviceLocations'>
			<SL_Container>
				<Card className='col-span-1'>
					<div className='flex flex-col justify-between h-full'>
						<CardHeader>
							<Title>Add Service Locations</Title>
							<Description>Add, edit or delete service locations.</Description>
							<Separator />
						</CardHeader>

						<div className='h-full px-3'>
							<p className='uppercase text-xs font-bold text-muted-foreground mb-2'>
								Details
							</p>
							<Badge>{serviceLocations.length} rows</Badge>
						</div>

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
									<Actions />
								</CardFooter>
							</form>
						</Form>
					</div>
				</Card>
				<div className='col-span-3'>
					<ServiceLocationTable setSelectedItem={setSelectedItem} />
				</div>
			</SL_Container>
		</TabsContent>
	)
}

const EditActions = ({ loading, isDirty, onClick }: EditActionsProps) => (
	<div className='flex w-full justify-between gap-3'>
		<ActiveButton
			label='Update'
			loading={loading}
			disabled={!isDirty}
			type='submit'
		/>
		<ActiveButton
			label='Delete'
			loading={loading}
			variant='destructive'
			onClick={onClick}
		/>
	</div>
)

export { ServiceLocationPanel }
