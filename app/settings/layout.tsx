'use client'
import Image from 'next/image'

import { Separator } from '@/components/ui/separator'
import { SidebarNav } from './_components/sidebar_nav'
import ProtectedRoute from '../_components/protectedRoutes'
import { Settings2Icon, SettingsIcon } from 'lucide-react'

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
		href: '/examples/forms/appearance',
	},
	{
		title: 'Notifications',
		href: '/examples/forms/notifications',
	},
	{
		title: 'Display',
		href: '/examples/forms/display',
	},
]

interface SettingsLayoutProps {
	children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
	return (
		<ProtectedRoute>
			<div className='md:hidden'></div>
			<div className='hidden space-y-0 md:block'>
				<div className='space-y-0.5 flex items-center my-4 mx-[26px]'>
					<SettingsIcon className='h-[18px] text-stone-500 fill-stone-100' />
					<h2 className='text-lg font-bold tracking-tight mx-3'>Settings</h2>
				</div>
				<Separator className='' />
				<div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
					<aside className='lg:w-1/5 border-r p-6'>
						<SidebarNav items={sidebarNavItems} />
					</aside>
					<div className='flex-1 lg:max-w-2xl px-1 py-8 border-r pr-10'>
						{children}
					</div>
				</div>
			</div>
		</ProtectedRoute>
	)
}
