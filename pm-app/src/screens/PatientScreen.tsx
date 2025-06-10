import '../index.css'

import {useState, useEffect} from "react";

import {Table} from "../components/Table.tsx";
import {NavBar} from "../components/Navbar.tsx";
import {PatientEditPopUp} from "../components/PatientEditPopUp.tsx";

export interface PatientResponse {
	"id": string,
	"name": string,
	"email": string,
	"address": string,
	"dateOfBirth": string
}
export interface PatientRequest {
	name: string,
	email: string,
	address: string,
	dateOfBirth: string
}

async function fetchToken(){

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

export function PatientScreen() {

	const [testPatients, setTestPatients] = useState<PatientResponse[]>([]);
	const [loading, setLoading] = useState(true);

	const [editPatient, setEditPatient] = useState<PatientResponse | false>(false);

	useEffect(() => {

		async function fetchPatients() {

			await fetchToken();
			const token = localStorage.getItem("token")

			const data: PatientResponse[] = await fetch("http://localhost:4004/api/patients",{
				method: "GET",
				headers: {"Authorization": `Bearer ${token}`}
			})
				.then(response => response.json())
				.catch(e => console.error(e));
			setTestPatients(data);
			setLoading(false);
		}

		fetchPatients();
	}, [])

	function handleEditPatient(patient: PatientResponse){
		if (!editPatient) {
			setEditPatient(patient);
		} else {
			setEditPatient(false);
		}
	}

	function handleDeletePatient(patient: PatientResponse){
		console.log(`Delete patient ${patient.id}...`);
	}

	function updatePut(patientResponse: PatientResponse){
		setTestPatients(testPatients.map(p => p.id === patientResponse.id ? patientResponse : p));
		handleEditPatient(patientResponse);
	}

	return (

		<>
			<NavBar></NavBar>

			<div className={"p-10"}>
				{!loading ? (<Table patients={testPatients} handleEditPatient={handleEditPatient} handleDeletePatient={handleDeletePatient}></Table>) : (<div></div>)}
				{editPatient ? (<PatientEditPopUp className={"absolute inset-0 content-center"} patient={editPatient} updateFunc={updatePut}></PatientEditPopUp>) : (<div></div>)}
			</div>
		</>
	)
}