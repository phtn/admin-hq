import { type ClassValue, clsx } from 'clsx'
import { Dispatch, ReactElement, SetStateAction, useLayoutEffect } from 'react'
import { twMerge } from 'tailwind-merge'

function capitalizeText(input: string): string {
	if (input.length === 0) {
		return input
	}

	const firstLetter = input.charAt(0).toUpperCase()
	const restOfString = input.substring(1)

	return firstLetter + restOfString
}

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

function decimal(num: string | number | undefined, digits: number): string {
	if (num === undefined) return '0.00'
	const parsedNumber = typeof num === 'string' ? parseFloat(num) : num
	const formattedNumber = parsedNumber.toLocaleString('en-US', {
		minimumFractionDigits: digits,
		maximumFractionDigits: digits,
	})
	return formattedNumber
}

function filterPayload<Type>(payload: Type) {
	const filtered = JSON.parse(JSON.stringify(payload))
	return filtered
}

function getFirstWord(str: string): string {
	let words: string[] = []
	if (str) {
		words = str.split(' ')
	}
	return words[0]
}

function getFirstAndLastWords(inputString: string): string[] {
	// Trim any leading or trailing spaces
	if (typeof inputString === 'string') {
		const trimmedString = inputString.trim()
		// Split the string into an array of words using space as the delimiter
		const wordsArray = trimmedString.split(' ')

		// Get the first and last words from the array
		const firstWord = wordsArray[0]
		const lastWord = wordsArray[wordsArray.length - 1]

		// Return an array containing the first and last words
		return [firstWord, lastWord]
	}
	return ['']
}

function generateGreeting(currentDate: Date): string {
	const currentHour = currentDate.getHours()
	if (currentHour >= 5 && currentHour < 12) {
		return 'Good morning'
	} else if (currentHour >= 12 && currentHour < 18) {
		return 'Good afternoon'
	} else {
		return 'Good evening'
	}
}

function getInitials(name: string | undefined): string {
	if (!name) return ''
	const words = name.trim().split(' ')
	if (words.length === 1) {
		return words[0].slice(0, 2)
	}
	const [first, last] = words // This destructuring assignment is more efficient than accessing words[0] and words[numWords - 1]
	if (words.length === 2) {
		return first.charAt(0) + last.charAt(0)
	}
	return first.charAt(0) + last.slice(-1) // Using slice(-1) instead of charAt(0) is more efficient for the last character
}

function limitText(text: string | undefined, length: number) {
	if (text === undefined) return ''
	if (text.length > length) {
		return `${text.substring(0, length)}...`
	}
	return text
}

function map(e1: ReactElement, e2: ReactElement): Map<boolean, ReactElement> {
	const pairs = new Map([
		[true, e1],
		[false, e2],
	])
	return pairs
}

function prettyDate(date: Date): string {
	const dayOfMonth = date.getDate()
	const month = Intl.DateTimeFormat('en-US', { month: 'long' }).format(date)
	const year = date.getFullYear()
	const time = date.toLocaleString('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	})
	return `${month.substring(0, 3)} ${dayOfMonth}, ${year} ${time}`
}

function sanitize(obj: Record<any, any>) {
	return Object.fromEntries(
		Object.entries(obj).filter(([_, value]) => value !== undefined)
	)
}

function toggle(setState: Dispatch<SetStateAction<boolean>>): void {
	setState((prevState) => !prevState)
}

export {
	capitalizeText,
	cn,
	decimal,
	filterPayload,
	generateGreeting,
	getFirstAndLastWords,
	getFirstWord,
	getInitials,
	limitText,
	map,
	prettyDate,
	sanitize,
	toggle,
}
