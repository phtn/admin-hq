import { Button } from '@/components/ui/button'
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { Laptop2, LayoutGridIcon, LogOut, MoonStar, Sun } from 'lucide-react'
import Link from 'next/link'
import { MenuContainer, MenuList } from './styled'
import { getAuth } from 'firebase/auth'
import { firebase } from '@/lib/db'
import { toast } from 'sonner'
import { MenuItem } from './types'
import useAuth from '@/app/_utils/hooks/useAuth'
import { map } from '@/app/_utils/helpers'
import { useCallback } from 'react'
import { useTheme } from 'next-themes'

const menulist: MenuItem[] = [
	{ id: 0, name: 'Users', href: '/' },
	{ id: 1, name: 'Activity', href: '/' },
	{ id: 2, name: 'Settings', href: '/settings' },
]

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
	const { userData } = useAuth()
	const { setTheme } = useTheme()

	const handleSignOut = () => {
		auth.signOut().then(() => {
			toast(<span>Signed out.</span>)
		})
	}

	const SignOutOptions = useCallback(() => {
		const signedIn = userData !== null
		const options = map(
			<Button
				onClick={handleSignOut}
				size='fat'
				variant='destructive'>
				Sign Out
				<LogOut className='ml-3 h-4 w-4' />
			</Button>,
			<></>
		)
		return <>{options.get(signedIn)}</>
	}, [userData])

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					variant='ghost'
					size='icon'>
					<LayoutGridIcon className='stroke-[1px] h-6' />
				</Button>
			</SheetTrigger>
			<SheetContent>
				<MenuList>
					{menulist.map((item) => (
						<SheetTitle key={item.id}>
							<Link
								href={item.href}
								className='hover:underline'>
								{item.name}
							</Link>
						</SheetTitle>
					))}
				</MenuList>

				<SheetTitle className='mt-6'>Color Modes</SheetTitle>

				<div className='border mt-3'>
					<div className='flex justify-around items-center py-3 '>
						<Button
							onClick={() => setTheme('light')}
							size='fat'
							variant='ghost'>
							<Sun className='h-4 w-4' />
						</Button>
						<Button
							onClick={() => setTheme('dark')}
							size='fat'
							variant='ghost'>
							<MoonStar className='h-4 w-4' />
						</Button>
						<Button
							onClick={() => setTheme('dark')}
							size='fat'
							variant='ghost'>
							<Laptop2 className='h-4 w-4' />
						</Button>
					</div>
				</div>

				<SheetFooter className='h-44 items-center'>
					<SignOutOptions />
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}
