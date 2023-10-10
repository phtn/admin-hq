import Lottie, { Options } from 'react-lottie'
import globe from '../../../public/lotties/globe.json'
import orb from '../../../public/lotties/orb.json'
import greenCheck from '../../../public/lotties/green-check.json'
import warning from '../../../public/lotties/warning.json'
import tesseract from '../../../public/lotties/dark-logo.json'

export const Tesseract = (options: Omit<Options, 'animationData'>) => {
	return (
		<div>
			<Lottie
				options={{ ...options, autoplay: true, animationData: tesseract }}
				style={{ height: 64, width: 64 }}
				speed={0.01}
			/>
		</div>
	)
}

export const SmallLoader = (options: Omit<Options, 'animationData'>) => {
	return (
		<div>
			<Lottie
				options={{ ...options, autoplay: true, animationData: globe }}
				style={{ height: 64, width: 64 }}
				speed={1}
			/>
		</div>
	)
}

export const BigLoader = (options: Omit<Options, 'animationData'>) => {
	return (
		<div>
			<Lottie
				options={{ ...options, autoplay: true, animationData: globe }}
				style={{ height: 128, width: 128 }}
				speed={1}
			/>
		</div>
	)
}

export const OrbLoader = (options: Omit<Options, 'animationData'>) => {
	return (
		<div>
			<Lottie
				options={{ ...options, autoplay: true, animationData: orb }}
				style={{ height: 32, width: 32 }}
				speed={1}
			/>
		</div>
	)
}

export const GreenCheck = (options: Omit<Options, 'animationData'>) => {
	return (
		<div>
			<Lottie
				options={{ ...options, autoplay: true, animationData: greenCheck }}
				style={{ height: 24, width: 24 }}
				speed={1}
			/>
		</div>
	)
}

export const Warning = (options: Omit<Options, 'animationData'>) => {
	return (
		<div>
			<Lottie
				options={{ ...options, autoplay: true, animationData: warning }}
				style={{ height: 32, width: 32 }}
				speed={1}
			/>
		</div>
	)
}
