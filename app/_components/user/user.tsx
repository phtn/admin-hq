import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { LayoutGridIcon } from 'lucide-react'

export function User() {
	return <SignIn />
}

const Profile = () => {
	return (
		<Avatar>
			<AvatarImage
				src='https://github.com/shadcn.png'
				alt='@shadcn'
			/>
			<AvatarFallback>CN</AvatarFallback>
		</Avatar>
	)
}

const SignIn = () => {
	return (
		<div className='w-64 justify-end flex'>
			<Button
				variant='ghost'
				size='icon'>
				<LayoutGridIcon className='stroke-[1px]' />
			</Button>
		</div>
	)
}
