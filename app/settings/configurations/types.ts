import { Control, ControllerRenderProps, FieldValues } from 'react-hook-form'
import { AdminConfigFormValues } from './page'

type FieldProps = {
	control: Control<AdminConfigFormValues>
	description: string
	fieldName: keyof AdminConfigFormValues
	isDirty: boolean
	label: string
	loading: boolean
}

type FieldHeaderProps = {
	description: string
	field: ControllerRenderProps<
		AdminConfigFormValues,
		keyof AdminConfigFormValues
	>
	isDirty: boolean
	label: string
	loading: boolean
}

type InitialStatusProps = StatusProps & {
	loading: boolean
}

type StatusProps = {
	status: boolean
}

type UnsavedStatusProps = StatusProps & {
	isDirty: boolean
}

export type {
	FieldProps,
	FieldHeaderProps,
	InitialStatusProps,
	StatusProps,
	UnsavedStatusProps,
}
