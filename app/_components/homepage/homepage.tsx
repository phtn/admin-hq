import { Overview } from './overview'
import { RecentSales } from './recent-sales'
import { Summary } from './summary'

const Homepage = () => {
	return (
		<div className='flex-1 h-[calc(100vh-48px)] overflow-scroll '>
			<div className='grid grid-cols-1 m-3 gap-3 md:grid-cols-4'>
				<Summary />
			</div>
			<div className='grid grid-cols-1 m-3 gap-3 md:grid-cols-5'>
				<Overview />
				<RecentSales />
			</div>

			<div className='grid grid-cols-1 m-3 gap-3 md:grid-cols-4'>
				<Summary />
			</div>

			<div className='grid grid-cols-1 m-3 gap-3 md:grid-cols-4'>
				<Summary />
			</div>
		</div>
	)
}

export { Homepage }
