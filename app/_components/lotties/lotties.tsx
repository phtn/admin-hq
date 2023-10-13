import { LottieComponentProps, useLottie } from 'lottie-react'
import globe from '../../../public/lotties/globe.json'
import orb from '../../../public/lotties/orb.json'
import greenCheck from '../../../public/lotties/green-check.json'
import warning from '../../../public/lotties/warning.json'
import tesseract from '../../../public/lotties/dark-logo.json'
import {
	LottieFile,
	LottieFileProps,
	LottieSize,
	LottieSizeValue,
} from './types'
import { CSSProperties } from 'react'

const lotties: LottieFile[] = [
	{ name: 'globe', file: globe },
	{ name: 'orb', file: orb },
	{ name: 'greenCheck', file: greenCheck },
	{ name: 'warning', file: warning },
	{ name: 'tesseract', file: tesseract },
]

const sizeOptionsMap: Map<LottieSize, LottieSizeValue> = new Map([
	['xxs', 10],
	['xs', 16],
	['sm', 32],
	['md', 96],
	['lg', 64],
	['xl', 72],
	['xxl', 96],
])

export const Looper = (props: LottieFileProps) => {
	const { data, loop } = props

	const size = Object.keys(props).find(
		(prop) => prop in sizeOptionsMap
	) as LottieSize

	const defaultSize: LottieSizeValue = 64

	const sizeValue: LottieSizeValue = size
		? (sizeOptionsMap.get(size) as LottieSizeValue)
		: defaultSize

	const style: CSSProperties = {
		height: sizeValue,
	}

	const animation = lotties.find((file) => file.name === data)
	const animationData = animation?.file

	const options: LottieComponentProps = {
		animationData,
		loop,
	}

	const { View } = useLottie(options, style)

	return <>{View}</>
}
