'use client'
import { map } from '@/app/_utils/helpers'
import { Button, ButtonProps } from '@/components/ui/button'
import { LoaderIcon } from 'lucide-react'
import { useCallback } from 'react'

type ActiveButtonProps = {
	label: string
	loading: boolean
} & ButtonProps

const ActiveButton = (props: ActiveButtonProps) => {
	const { label, loading } = props

	const StatusOptions = useCallback(() => {
		const options = map(
			<LoaderIcon className='h-4 w-4 animate-spin' />,
			<>{label}</>
		)
		return <>{options.get(loading)}</>
	}, [loading])

	return (
		<Button
			{...props}
			className='w-full'>
			<StatusOptions />
		</Button>
	)
}

export { ActiveButton }
