'use client'
import { map } from '@/app/_utils/helpers'
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
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFormState } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const configFormSchema = z.object({
	dashboard_access: z.boolean().default(true),
})

type AdminConfigFormValues = z.infer<typeof configFormSchema>

const defaultValues: Partial<AdminConfigFormValues> = {
	dashboard_access: true,
}

const Configurations = () => {
	const {
		control,
		formState: { isDirty },
		handleSubmit,
		getValues,
	} = useForm<AdminConfigFormValues>({
		resolver: zodResolver(configFormSchema),
		defaultValues,
	})

	const form = useForm<AdminConfigFormValues>({
		resolver: zodResolver(configFormSchema),
		defaultValues,
	})

	function onSubmit(data: AdminConfigFormValues) {
		console.log(data)
	}

	const BadgeOptions = ({ status }: { status: boolean }) => {
		const options = map(
			<Badge
				variant='secondary'
				className='mx-3 bg-[#1FE487]'>
				Enabled
			</Badge>,
			<Badge
				variant='destructive'
				className='mx-3'>
				Disabled
			</Badge>
		)
		return <>{options.get(status)}</>
	}

	const UnsavedOptions = ({ status }: { status: boolean }) => {
		const options = map(
			<Badge
				variant='outline'
				className='border-dashed border-amber-500 text-amber-500'>
				Unsaved
			</Badge>,
			<></>
		)
		return <>{options.get(status)}</>
	}

	return (
		<div className=''>
			<div className=''>
				<h3 className='mb-4 text-xs text-stone-400 font-bold tracking-wider uppercase'>
					App Configurations
				</h3>
				<div className='space-y-4'>
					<Form {...form}>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className='space-y-8'>
							<FormField
								control={control}
								name='dashboard_access'
								render={({ field }) => (
									<FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
										<div className='space-y-0.5'>
											<FormLabel className='text-base font-bold'>
												Dashboard Access
												<BadgeOptions status={field.value} />
												<UnsavedOptions status={isDirty} />
											</FormLabel>
											<FormDescription>
												Set to enable or disable access to app dashboard.
											</FormDescription>
										</div>
										<FormControl>
											<Switch
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<Button type='submit'>Save</Button>
						</form>
					</Form>
				</div>
			</div>
		</div>
	)
}

export default Configurations
