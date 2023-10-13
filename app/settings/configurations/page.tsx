'use client'
import { POST_DashboardAccessUpdate } from '@/app/_api/post'
import { useFetchConfig } from '@/app/_utils/hooks/useFetchConfig'
import { Form } from '@/components/ui/form'
import { firebase } from '@/lib/db'
import { zodResolver } from '@hookform/resolvers/zod'
import { getAuth } from 'firebase/auth'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ConfigHeader, SwitchField } from './components'
import { FormContainer } from './styled'
import { FieldProps } from './types'
import { Submit } from '../_components/form_components'

const configFormSchema = z.object({
	dashboard_access: z.boolean(),
})

export type AdminConfigFormValues = z.infer<typeof configFormSchema>

const Configurations = () => {
	const auth = getAuth(firebase)
	const uid = auth.currentUser?.uid as string
	const { config, configLoading } = useFetchConfig()
	const [dashboard_access, setDashboardAccess] = useState<boolean>(
		config?.dashboardAccess as boolean
	)
	const [updateLoading, setUpdateLoading] = useState(false)

	useEffect(() => {
		if (config) {
			setDashboardAccess(config?.dashboardAccess as boolean)
		}
	}, [config])

	useEffect(() => {
		setValue('dashboard_access', dashboard_access as boolean)
	}, [dashboard_access])

	const defaultValues: Partial<AdminConfigFormValues> = useMemo(
		() => ({ dashboard_access }),
		[dashboard_access, config]
	)

	const {
		control,
		formState: { isDirty },
		handleSubmit,
		reset,
		setValue,
	} = useForm<AdminConfigFormValues>({
		resolver: zodResolver(configFormSchema),
		defaultValues,
	})

	const form = useForm<AdminConfigFormValues>({
		resolver: zodResolver(configFormSchema),
		defaultValues,
	})

	const onSubmit = (data: AdminConfigFormValues) => {
		if (isDirty) {
			setUpdateLoading(true)
			POST_DashboardAccessUpdate({
				uid: uid,
				status: data.dashboard_access,
			}).then(() => {
				reset({ dashboard_access: data.dashboard_access })
				setUpdateLoading(false)
			})
		}
	}

	const Field = useCallback(
		(props: FieldProps) => <SwitchField {...props} />,
		[control, isDirty, configLoading]
	)

	return (
		<div className='w-full'>
			<ConfigHeader />
			<FormContainer>
				<Form {...form}>
					<form
						name='app-config'
						onSubmit={handleSubmit(onSubmit)}
						className='space-y-8'>
						<Field
							control={control}
							description='Set to enable or disable access to app dashboard.'
							fieldName='dashboard_access'
							isDirty={isDirty}
							label='Dashboard Access'
							loading={configLoading}
						/>
						<Submit
							status={!isDirty}
							label='Save changes'
							loading={updateLoading}
						/>
					</form>
				</Form>
			</FormContainer>
		</div>
	)
}

export default Configurations
