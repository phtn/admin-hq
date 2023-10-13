import { map } from '@/app/_utils/helpers'
import { Button } from '@/components/ui/button'
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoaderIcon } from 'lucide-react'
import { Control, FieldValues, Path } from 'react-hook-form'

export type SubmitActionProps = {
	status: boolean
	label: string
	loading: boolean
}

export type FieldProps<T> = {
	control: Control<any>
	defaultValue: string
	description: string
	fieldName: Path<FieldValues>
	isDirty: boolean
	label: string
	placeholder: string
	loading?: boolean
}

const InputField = <T,>(props: FieldProps<T>) => {
	const { control, description, fieldName, label, loading, placeholder } = props
	return (
		<FormField
			control={control}
			name={fieldName}
			render={({ field }) => (
				<FormItem>
					<FormLabel children={label} />
					<FormControl>
						<Input
							placeholder={placeholder}
							value={field.value}
							onChange={field.onChange}
							className='w-full'
							disabled={loading}
						/>
					</FormControl>
					<FormDescription children={description} />
					{/* <FormMessage /> */}
				</FormItem>
			)}
		/>
	)
}

const SaveOptions = ({ label, loading }: Partial<SubmitActionProps>) => {
	const options = map(
		<LoaderIcon className='mr-2 h-4 w-4 animate-spin' />,
		<p>{label}</p>
	)
	return <>{options.get(loading as boolean)}</>
}

const Submit = ({ status, label, loading }: SubmitActionProps) => (
	<Button
		type='submit'
		disabled={status}
		className='w-full'>
		<SaveOptions
			label={label}
			loading={loading}
		/>
	</Button>
)

export { InputField, Submit }
