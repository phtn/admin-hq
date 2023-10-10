import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { LayoutGridIcon } from 'lucide-react'
import Link from 'next/link'
import { MenuContainer } from './styled'
import { getAuth } from 'firebase/auth'
import { db, firebase } from '@/lib/db'
import { toast } from 'sonner'

const auth = getAuth(firebase)

export function MobileMenu() {
	return <MenuTrigger />
}

const MenuTrigger = () => {
	return (
		<MenuContainer>
			<SheetMenu />
		</MenuContainer>
	)
}

const SheetMenu = () => {
	function handleSignOut() {
		auth.signOut().then(() => {
			toast(<span>Signed out.</span>)
		})
	}
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					variant='ghost'
					size='icon'>
					<LayoutGridIcon className='stroke-[1px]' />
				</Button>
			</SheetTrigger>
			<SheetContent>
				<div className='h-56 justify-around flex flex-col mt-6'>
					<SheetTitle>
						<Link
							href='/'
							className='hover:underline'>
							Users
						</Link>
					</SheetTitle>
					<SheetTitle>
						<Link
							href='/'
							className='hover:underline'>
							Activity
						</Link>
					</SheetTitle>
					<SheetTitle>
						<Link
							href='/settings'
							className='hover:underline'>
							Settings
						</Link>
					</SheetTitle>
					<SheetTitle>
						<Button onClick={handleSignOut}> Sign out</Button>
					</SheetTitle>
				</div>
			</SheetContent>
		</Sheet>
	)
}
