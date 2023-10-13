import { ServiceLocation } from '@/app/types'
import { Column, type ColumnDef } from '@tanstack/react-table'

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
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

export type { ColNameProps, DataTableProps, InputFieldProps }
