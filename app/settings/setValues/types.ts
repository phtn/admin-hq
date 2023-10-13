import { ServiceLocation } from '@/app/types'
import { Column, type ColumnDef } from '@tanstack/react-table'
import { Dispatch, SetStateAction } from 'react'

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
	setSelectedItem: Dispatch<SetStateAction<TData | undefined>>
}

type ColNameProps = {
	name: string
	column: Column<ServiceLocation, unknown>
}

type InputFieldProps = {
	id: string
	name: string
	label: string
	defaultValue: any
	placeholder: string
}

type ServiceLocationTableProps = {
	setSelectedItem: Dispatch<SetStateAction<ServiceLocation | undefined>>
}

type EditActionsProps = {
	loading: boolean
	isDirty: boolean
	onClick: () => void
}

export type {
	ColNameProps,
	DataTableProps,
	EditActionsProps,
	InputFieldProps,
	ServiceLocationTableProps,
}
