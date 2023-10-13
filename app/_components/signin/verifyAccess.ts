import { useFetchConfig } from '@/app/_utils/hooks/useFetchConfig'

const VerifyAccess = (uid: string) => {
	const { admins } = useFetchConfig()

	if (admins.length) {
		const adminRole = admins.includes(uid)
		if (adminRole) {
			return true
		}
		return false
	}
	return false
}

export { VerifyAccess }
