import type { FunctionComponent } from 'react'
import {Table} from "../components/Table.tsx";
import '../index.css'
import {NavBar} from "../components/Navbar.tsx";

interface PatientResponse {
	"id": string,
	"name": string,
	"email": string,
	"address": string,
	"dateOfBirth": string
}
interface PatientRequest {
	name: string,
	email: string,
	address: string,
	dateOfBirth: string
}

const objToMap = (obj: PatientResponse | PatientRequest) => {
	return (new Map(Object.entries(obj)));
}

const handleEditPatient = (patient: Map<string, string>) => {
	console.log(`Edit ${patient.get("id")}`)
}
const handleDeletePatient = (patient: Map<string, string>) => {
	console.log(`Delete ${patient.get("id")}`)
}

export const PatientScreen: FunctionComponent = () => {

	const testPatients: Map<string, string>[] = [];
	for (let i = 0; i < 10; i++) {
		testPatients.push(objToMap({
			id: "3bd442c7-938e-47f7-b3d2-0c8af8de082" + i,
			name: "Jon Doe",
			email: "JonDoe@mail.com",
			address: "221B Baker Street, London",
			dateOfBirth: "1997-02-13"
		}));
	}

	return (

		<>
			<NavBar></NavBar>

			<div className={"p-10"}>
				<Table props={testPatients} handleEdit={handleEditPatient} handleDelete={handleDeletePatient}></Table>
			</div>
		</>
	)
}