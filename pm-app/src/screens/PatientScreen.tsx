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
		console.log(`Edit patient ${patient.id}...`);
	}

	function handleDeletePatient(patient: PatientResponse){
		console.log(`Edit patient ${patient.id}...`);
	}

	function handlePutPatient(patientId: string){
		fetch(
			"http://localhost:4004/api/patients/"+patientId,
			{
				method: "GET",
				headers:{"Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("token")}
			}
		)
			.then(response => response.json())
			.then(data => setTestPatients(
				testPatients.map(p => p.id === data.id ? data : p
				)))
			.catch(e => console.error(e));
	}

	return (

		<>
			<NavBar></NavBar>

			<div className={"p-10"}>
				{!loading ? (<Table patients={testPatients} handleEditPatient={handleEditPatient} handleDeletePatient={handleDeletePatient}></Table>) : (<div></div>)}
				{!loading ? (<PatientEditPopUp patient={testPatients[0]} updateFunc={handlePutPatient}></PatientEditPopUp>) : (<div></div>)}
			</div>
		</>
	)
}