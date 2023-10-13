type LottieSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
type LottieSizeValue = 10 | 16 | 32 | 48 | 64 | 72 | 96
type LottieFile = {
	name: string
	file: unknown
}
type LottieFileProps = {
	[key in LottieSize]?: boolean
} & {
	loop?: boolean
	auto?: boolean
	data: 'greenCheck' | 'globe' | 'tesseract' | 'warning'
}

export type { LottieFile, LottieFileProps, LottieSize, LottieSizeValue }
