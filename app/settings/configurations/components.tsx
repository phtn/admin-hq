import { Badge } from '@/components/ui/badge'
import { LoaderIcon } from 'lucide-react'

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

export { EnabledBadge, DisabledBadge, LoadingBadge, UnsavedBadge }
