import type { FunctionComponent } from 'react'
import '../index.css'

interface PatientResponse {
	id: string,
	name: string,
	email: string,
	address: string,
	dateOfBirth: string
}
interface PatientRequest {
	name: string,
	email: string,
	address: string,
	dateOfBirth: string
}

export const PatientScreen: FunctionComponent = () => {
	return (
		<>
		</>
	)
}