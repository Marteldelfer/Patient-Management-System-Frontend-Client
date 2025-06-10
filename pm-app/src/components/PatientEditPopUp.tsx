import "../index.css"
import type {PatientResponse, PatientRequest} from "../screens/PatientScreen.tsx";
import {useRef} from "react";

interface PatientEditPopUpProps {
	patient: PatientResponse;
	updateFunc: (patientId: string) => void;
}

function handleEditPatient(patientId: string, request: PatientRequest, updateFunc: () => void) {
	const token = localStorage.getItem('token');
	fetch("http://localhost:4004/api/patients/" + patientId, {
		method: "PUT",
		headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
		body: JSON.stringify(request),
	})
		.then(() => updateFunc())
		.catch(e => console.error(e));
}

export function PatientEditPopUp({patient, updateFunc}: PatientEditPopUpProps){

	const name = useRef(patient.name);
	const email = useRef(patient.email);
	const address = useRef(patient.address);
	const dateOfBirth = useRef(patient.dateOfBirth);

	return (
		<>
			<div className={"m-auto w-4/5 max-w-xl border-2 rounded-3xl text-center border-gray-400"}>
				<div>
					<label htmlFor="patientName"	>Name</label>
					<input type="text" defaultValue={patient.name} onChange={
						(e) => {
							name.current = e.target.value;
							console.log(name.current);
						}
					}/>
				</div>
				<div>
					<label htmlFor="patientEmail">Email</label>
					<input type="text" defaultValue={patient.email} onChange={
						(e) => {
							email.current = e.target.value;
							console.log("email", email.current);
						}
					} />
				</div>
				<div>
					<label htmlFor="patientAddress">Address</label>
					<input type="text" defaultValue={patient.address} onChange={
						(e) => {
							address.current = e.target.value;
							console.log(address.current);
						}
					}/>
					<div>
						<label htmlFor="patientDateOfBirth">Date of birth</label>
						<input type="date" defaultValue={patient.dateOfBirth} onChange={
							(e) => {
								dateOfBirth.current = e.target.value.toString();
								console.log(dateOfBirth.current);
							}
						}/>
					</div>
				</div>
				<button type="submit" onClick={() => {
					handleEditPatient(
						patient.id,
						{
							name: name.current,
							email: email.current,
							address: address.current,
							dateOfBirth: dateOfBirth.current.toString()
						},
						() => updateFunc(patient.id)
					);
				}}>
					Edit Patient
				</button>
			</div>
		</>
	)
}