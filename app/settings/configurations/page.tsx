'use client'
import { POST_DashboardAccessUpdate } from '@/app/_api/post'
import { map } from '@/app/_utils/helpers'
import { useFetchConfig } from '@/app/_utils/hooks/useFetchConfig'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { firebase } from '@/lib/db'
import { zodResolver } from '@hookform/resolvers/zod'
import { getAuth } from 'firebase/auth'
import { Loader, Settings2Icon } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
	DisabledBadge,
	EnabledBadge,
	LoadingBadge,
	UnsavedBadge,
} from './components'

const configFormSchema = z.object({
	dashboard_access: z.boolean(),
})

type AdminConfigFormValues = z.infer<typeof configFormSchema>

const Configurations = () => {
	const auth = getAuth(firebase)
	const uid = auth.currentUser?.uid as string
	const { config, configLoading } = useFetchConfig()
	const [dashboard_access, setDashboardAccess] = useState<boolean>()
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

	function onSubmit(data: AdminConfigFormValues) {
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

	const BadgeOptions = ({ status }: { status: boolean }) => {
		const options = map(<EnabledBadge />, <DisabledBadge />)
		return <>{options.get(status)}</>
	}

	const InitialBadgeOptions = ({ status }: { status: boolean }) => {
		const options = map(<LoadingBadge />, <BadgeOptions status={status} />)
		return <>{options.get(configLoading)}</>
	}

	const UnsavedOptions = ({ status }: { status: boolean }) => {
		const options = map(<UnsavedBadge />, <></>)
		return <>{options.get(status)}</>
	}

	const SaveOptions = useCallback(() => {
		const options = map(
			<Loader className='mr-2 h-4 w-4 animate-spin' />,
			<p>Save</p>
		)
		return <>{options.get(updateLoading)}</>
	}, [updateLoading])

	return (
		<div className=''>
			<div className='flex'>
				<Settings2Icon className='h-4 fill-stone-100 text-stone-500 mx-3' />
				<h3 className=' mb-4 text-xs text-stone-500 font-medium tracking-wider uppercase'>
					App Configurations
				</h3>
			</div>
			<div className='space-y-4'>
				<Form {...form}>
					<form
						name='app-config'
						onSubmit={handleSubmit(onSubmit)}
						className='space-y-8'>
						<FormField
							control={control}
							name='dashboard_access'
							render={({ field }) => (
								<FormItem className='flex flex-row items-center justify-between border p-4'>
									<div className='space-y-0.5'>
										<FormLabel className='text-base font-bold'>
											Dashboard Access
											<InitialBadgeOptions status={field.value} />
											<UnsavedOptions status={isDirty} />
										</FormLabel>
										<FormDescription>
											Set to enable or disable access to app dashboard.
										</FormDescription>
									</div>
									<FormControl>
										<Switch
											name='dashboard-access-switch'
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<Button
							type='submit'
							disabled={!isDirty}>
							<SaveOptions />
						</Button>
					</form>
				</Form>
			</div>
		</div>
	)
}

export default Configurations
