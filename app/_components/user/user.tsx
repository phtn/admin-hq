import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

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
		<Button
			variant='ghost'
			size='sm'>
			Sign in
		</Button>
	)
}
