import {type FunctionComponent, useEffect, useState} from 'react'
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

const objToMap = (obj: PatientResponse | PatientRequest): Map<string, string> => {
	return (new Map(Object.entries(obj)));
}

const handleEditPatient = (patient: Map<string, string>) => {
	console.log(`Edit ${patient.get("id")}`)
}
const handleDeletePatient = (patient: Map<string, string>) => {
	console.log(`Delete ${patient.get("id")}`)
}

const fetchToken = async () => {

	const response = await fetch("http://localhost:4004/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		}, body: JSON.stringify({
			email: "testuser@test.com",
			password: "password123"
		})
	});
	const data = await response.json();
	localStorage.setItem("token", data.token);
}

export const PatientScreen: FunctionComponent = () => {

	const [testPatients, setTestPatients] = useState<Map<string, string> | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {

		const fetchPatients = async () => {
			let token = localStorage.getItem("token");
			if (token === null) {
				await fetchToken();
				token = localStorage.getItem("token")
			}
			const response = await fetch("http://localhost:4004/api/patients",{
				method: "GET",
				headers: {"Authorization": `Bearer ${token}`}
			});
			const data: Array<PatientResponse> = await response.json();
			const res = data.map(patient => objToMap(patient));
			setTestPatients(res);
			setLoading(false);
		}

		fetchPatients();
	}, [])

	return (

		<>
			<NavBar></NavBar>

			<div className={"p-10"}>
				{!loading ? (<Table props={testPatients} handleEdit={handleEditPatient} handleDelete={handleDeletePatient}></Table>) : (<div></div>)}
			</div>
		</>
	)
}