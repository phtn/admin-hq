import { Backdrop, Blur, Body } from './styled'
import { Homepage } from './_components/homepage/homepage'
import ProtectedRoute from './_components/protectedRoutes'

export default function Home() {
	return (
		<>
			<Backdrop>
				<Blur />
			</Backdrop>
			<Body>
				<ProtectedRoute>
					<Homepage />
				</ProtectedRoute>
			</Body>
		</>
	)
}
