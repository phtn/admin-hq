// 'use client'
// import { Separator } from '@/components/ui/separator'
// import Image from 'next/image'
// import { SidebarNav } from './sidebar_nav'
// import { map } from '@/app/_utils/helpers'
// import { Unauthorized } from '@/app/_components/unauthorized/unauthorized'
// import { db } from '@/lib/db'
// import { getAuth } from 'firebase/auth'
// import useAuth from '@/app/_utils/hooks/useAuth'

// const auth = getAuth(db)

// const sidebarNavItems = [
// 	{
// 		title: 'Admin',
// 		href: '/settings',
// 	},
// 	{
// 		title: 'Account',
// 		href: '/examples/forms/account',
// 	},
// 	{
// 		title: 'Appearance',
// 		href: '/examples/forms/appearance',
// 	},
// 	{
// 		title: 'Notifications',
// 		href: '/examples/forms/notifications',
// 	},
// 	{
// 		title: 'Display',
// 		href: '/examples/forms/display',
// 	},
// ]

// interface SettingsLayoutProps {
// 	children: React.ReactNode
// }

// const Authenticated = ({ children }: SettingsLayoutProps) => {
// 	return (
// 		<>
// 			<div className='md:hidden'>
// 				<Image
// 					src='/examples/forms-light.png'
// 					width={1280}
// 					height={791}
// 					alt='Forms'
// 					className='block dark:hidden'
// 				/>
// 				<Image
// 					src='/examples/forms-dark.png'
// 					width={1280}
// 					height={791}
// 					alt='Forms'
// 					className='hidden dark:block'
// 				/>
// 			</div>
// 			<div className='hidden space-y-6 p-10 pb-16 md:block'>
// 				<div className='space-y-0.5'>
// 					<h2 className='text-2xl font-bold tracking-tight'>Settings</h2>
// 					<p className='text-muted-foreground'>
// 						Manage your account settings and set e-mail preferences.
// 					</p>
// 				</div>
// 				<Separator className='my-6' />
// 				<div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
// 					<aside className='-mx-4 lg:w-1/5'>
// 						<SidebarNav items={sidebarNavItems} />
// 					</aside>
// 					<div className='flex-1 lg:max-w-2xl'>{children}</div>
// 				</div>
// 			</div>
// 		</>
// 	)
// }

// export const Authenticator = ({ children }: SettingsLayoutProps) => {
// 	const { userData } = useAuth()
// 	const isAuth = userData?.email !== null
// 	const options = map(<Authenticated children={children} />, <Unauthorized />)
// 	return <>{options.get(isAuth)}</>
// }
