import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	GemIcon,
	Users2Icon,
	ShoppingBagIcon,
	ActivityIcon,
} from 'lucide-react'

const Summary = () => {
	return (
		<>
			<Card>
				<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
					<CardTitle className='text-sm font-normal'>Total Revenue</CardTitle>
					<GemIcon className='h-4 w-4' />
				</CardHeader>
				<CardContent>
					<div className='text-2xl font-bold'>₱45,231.89</div>
					<p className='text-xs text-muted-foreground'>
						+20.1% from last month
					</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
					<CardTitle className='text-sm font-normal'>Subscriptions</CardTitle>
					<Users2Icon className='h-4 w-4' />
				</CardHeader>
				<CardContent>
					<div className='text-2xl font-bold'>+345</div>
					<p className='text-xs text-muted-foreground'>
						+5.04% from last month
					</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
					<CardTitle className='text-sm font-normal'>Sales</CardTitle>
					<ShoppingBagIcon className='h-4 w-4' />
				</CardHeader>
				<CardContent>
					<div className='text-2xl font-bold'>+1064</div>
					<p className='text-xs text-muted-foreground'>+19% from last month</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
					<CardTitle className='text-sm font-normal'>Active Now</CardTitle>
					<ActivityIcon className='h-4 w-4' />
				</CardHeader>
				<CardContent>
					<div className='text-2xl font-bold'>+1064</div>
					<p className='text-xs text-muted-foreground'>+198 since last hour</p>
				</CardContent>
			</Card>
		</>
	)
}
export { Summary }
