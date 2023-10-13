'use client'

import { ServiceLocation } from '@/app/types'
import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { ChevronsUpDownIcon } from 'lucide-react'
import { ColNameProps } from './types'
import { Checkbox } from '@/components/ui/checkbox'

const ColName = ({ name, column }: ColNameProps) => (
	<Button
		className='w-full'
		variant='void'
		onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
		<span className='text-slate-600 font-medium'>{name}</span>
		<ChevronsUpDownIcon className='ml-2 h-4 w-4 text-slate-500' />
	</Button>
)

export const serviceLocationCol: ColumnDef<ServiceLocation>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<div className='flex self-center'>
				<Checkbox
					checked={table.getIsAllPageRowsSelected()}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label='Select all'
					className='self-center text-stone-400'
				/>
			</div>
		),
		cell: ({ row }) => (
			<div className='flex self-center'>
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label='Select row'
				/>
			</div>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'value',
		header: ({ column }) => (
			<ColName
				name='Location'
				column={column}
			/>
		),
	},
	{
		accessorKey: 'region',
		header: ({ column }) => (
			<ColName
				name='Region'
				column={column}
			/>
		),
	},
	{
		accessorKey: 'createdAt',
		header: ({ column }) => (
			<ColName
				name='createdAt'
				column={column}
			/>
		),
	},
	{
		accessorKey: 'user',
		header: ({ column }) => (
			<ColName
				name='User'
				column={column}
			/>
		),
	},
]
