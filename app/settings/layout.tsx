import { Separator } from '@/components/ui/separator'
import { SidebarNav } from './_components/sidebar_nav'
import { SettingsIcon } from 'lucide-react'

const sidebarNavItems = [
	{
		title: 'Admin',
		href: '/settings',
	},
	{
		title: 'Configurations',
		href: '/settings/configurations',
	},
	{
		title: 'Set Values',
		href: '/settings/setValues',
	},
	{
		title: 'Notifications',
		href: '/settings/notifications',
	},
	{
		title: 'Display',
		href: '/settings/display',
	},
]

interface SettingsLayoutProps {
	children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
	return (
		<>
			<div className='hidden space-y-0 sm:block bg-transparent'>
				<div className='space-y-0.5 flex items-center my-4 mx-[20px]'>
					<SettingsIcon className='h-[24px] text-stone-500 stroke-1' />
					<h2 className='text-lg font-bold tracking-tight mx-4'>Settings</h2>
				</div>
				<Separator />
				<div className='flex flex-col lg:flex-row'>
					<aside className='lg:w-1/5 border-r'>
						<SidebarNav items={sidebarNavItems} />
					</aside>
					<div className='flex w-full border-r justify-center p-6'>
						{children}
					</div>
				</div>
			</div>
		</>
	)
}
