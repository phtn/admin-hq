'use client'

import {
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
} from '@tanstack/react-table'

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { DataTableProps } from './types'
import { useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { ServiceLocation } from '@/app/types'

type SkeletonCellProps = {
	h: number
	w?: number
}

const SkeletonCell = ({ h, w }: SkeletonCellProps) => (
	<TableCell
		colSpan={1}
		className='my-4'>
		<Skeleton className={`h-[${h}px] ${w ? 'w-[' + w + 'px]' : 'w-full'}`} />
	</TableCell>
)

const Loading = ({ cols }: { cols: number }) => {
	const cells = Array.from({ length: cols }, (_, i) => i)
	return (
		<TableRow>
			<SkeletonCell
				h={18}
				w={18}
			/>
			{cells.map((i) => (
				<SkeletonCell
					key={i}
					h={24}
				/>
			))}
		</TableRow>
	)
}

export function DataTable<TData, TValue>({
	columns,
	data,
	setSelectedItem,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([])

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
		state: {
			sorting,
		},
	})

	const handleSelectItem = (item: TData) => () => {
		setSelectedItem(item)
	}

	return (
		<div className='border border-l-0 h-full'>
			<Table>
				<TableHeader className='bg-stone-100 dark:bg-transparent'>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow
							key={headerGroup.id}
							className='hover:bg-stone-200/25 dark:bg-stone-950'>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead
										key={header.id}
										className='text-stone-300 items-center'>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
											  )}
									</TableHead>
								)
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								onClick={handleSelectItem(row.original)}
								key={row.id}
								data-state={row.getIsSelected() && 'selected'}>
								{row.getVisibleCells().map((cell) => (
									<TableCell
										key={cell.id}
										className='text-center text-xs py-2'>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<>
							<Loading cols={columns.length} />
							<Loading cols={columns.length} />
							<Loading cols={columns.length} />
							<Loading cols={columns.length} />
							<Loading cols={columns.length - 3} />
							<Loading cols={columns.length - 4} />
						</>
					)}
				</TableBody>
			</Table>
		</div>
	)
}
