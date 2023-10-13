import { Badge } from '@/components/ui/badge'
import { LoaderIcon } from 'lucide-react'
import { ReactElement } from 'react'
import { FieldItem, FieldLabel, HeaderTitle, Tweak } from './styled'
import {
	FieldHeaderProps,
	FieldProps,
	InitialStatusProps,
	StatusProps,
} from './types'
import { FormControl, FormDescription, FormField } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { map } from '@/app/_utils/helpers'
import { Button } from '@/components/ui/button'

type HeaderProps = {
	icon: ReactElement
	title: string
}

const Header = ({ icon, title }: HeaderProps) => (
	<div className='flex items-center h-12'>
		{icon}
		<HeaderTitle>{title}</HeaderTitle>
	</div>
)

const ConfigHeader = () => (
	<Header
		icon={<Tweak />}
		title='App Configuration'
	/>
)

/*****************
// *	BADGES	*	//
*****************/

const EnabledBadge = () => (
	<Badge
		variant='default'
		className='mx-3 text-[#1FE487]'>
		Enabled
	</Badge>
)

const DisabledBadge = () => (
	<Badge
		variant='destructive'
		className='mx-3'>
		Disabled
	</Badge>
)

const UnsavedBadge = () => (
	<Badge
		variant='outline'
		className='border-dashed border-amber-500 text-amber-500'>
		Unsaved
	</Badge>
)

const LoadingBadge = () => (
	<Badge
		variant='secondary'
		className='mx-3'>
		<LoaderIcon className='h-[16px] text-stone-400 animate-spin duration-1000' />
	</Badge>
)

/*****************
// *	FORM	*	//
*****************/

const CurrentStatus = ({ status }: StatusProps) => {
	const options = map(<EnabledBadge />, <DisabledBadge />)
	return <>{options.get(status)}</>
}

const InitialStatus = ({ loading, status }: InitialStatusProps) => {
	const options = map(<LoadingBadge />, <CurrentStatus status={status} />)
	return <>{options.get(loading)}</>
}

const UnsavedStatus = ({ status }: StatusProps) => {
	const options = map(<UnsavedBadge />, <></>)
	return <>{options.get(status)}</>
}

const FieldHeader = ({
	description,
	field,
	isDirty,
	label,
	loading,
}: FieldHeaderProps) => (
	<div className='space-y-0.5'>
		<FieldLabel>
			{label}
			<InitialStatus
				loading={loading}
				status={field.value}
			/>
			<UnsavedStatus status={isDirty} />
		</FieldLabel>
		<FormDescription>{description}</FormDescription>
	</div>
)

const SwitchField = ({
	control,
	description,
	fieldName,
	isDirty,
	label,
	loading,
}: FieldProps) => (
	<FormField
		control={control}
		name={fieldName}
		render={({ field }) => (
			<FieldItem>
				<FieldHeader
					description={description}
					field={field}
					isDirty={isDirty}
					label={label}
					loading={loading}
				/>
				<FormControl>
					<Switch
						name='dashboard-access-switch'
						checked={field.value}
						onCheckedChange={field.onChange}
					/>
				</FormControl>
			</FieldItem>
		)}
	/>
)

export {
	ConfigHeader,
	EnabledBadge,
	DisabledBadge,
	LoadingBadge,
	UnsavedBadge,
	SwitchField,
}
