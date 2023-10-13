import { Button } from '@/components/ui/button'
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Loader } from 'lucide-react'
import { ServiceLocationTable } from './service-location-table'
import { ServiceLocationPanel } from './service-location'

const SetValues = () => {
	return (
		<Tabs
			defaultValue='serviceLocations'
			className='w-full'>
			<TabsList className='grid w-full grid-cols-4 mb-4'>
				<TabsTrigger value='serviceLocations'>Service Location</TabsTrigger>
				<TabsTrigger value='password'>Fees</TabsTrigger>
				<TabsTrigger value='services'>Services</TabsTrigger>
				<TabsTrigger value='policies'>Policies</TabsTrigger>
			</TabsList>
			<ServiceLocationPanel />
			<TabsContent value='password'>
				<Card>
					<CardHeader>
						<CardTitle>Password</CardTitle>
						<CardDescription>
							Change your password here. After saving, you'll be logged out.
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-2'>
						<div className='space-y-1'>
							<Label htmlFor='current'>Current password</Label>
							<Input
								id='current'
								type='password'
							/>
						</div>
						<div className='space-y-1'>
							<Label htmlFor='new'>New password</Label>
							<Input
								id='new'
								type='password'
							/>
						</div>
					</CardContent>
					<CardFooter>
						<Button>Save password</Button>
					</CardFooter>
				</Card>
			</TabsContent>
		</Tabs>
	)
}

export default SetValues
