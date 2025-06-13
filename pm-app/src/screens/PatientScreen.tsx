import "../index.css";

import { useState, useEffect } from "react";

import { Table } from "../components/Table.tsx";
import { NavBar } from "../components/Navbar.tsx";
import { PatientEditPopUp } from "../components/PatientEditPopUp.tsx";
import { PatientDeletePopUp } from "../components/PatientDeletePopUp.tsx";
import { PatientCreatePopUp } from "../components/PatientCreatePopUp.tsx";

export interface PatientResponse {
  id: string;
  name: string;
  email: string;
  address: string;
  dateOfBirth: string;
}
export interface PatientRequest {
  name: string;
  email: string;
  address: string;
  dateOfBirth: string;
}

async function fetchToken() {
  const response = await fetch("http://localhost:4004/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "testuser@test.com",
      password: "password123",
    }),
  });
  const data = await response.json();
  localStorage.setItem("token", data.token);
}

export function PatientScreen() {
  const [testPatients, setTestPatients] = useState<PatientResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const [editPatient, setEditPatient] = useState<PatientResponse | false>(
    false
  );
  const [deletePatient, setDeletePatient] = useState<PatientResponse | false>(
    false
  );
  const [createPatient, setCreatePatient] = useState<boolean>(false);

  useEffect(() => {
    async function fetchPatients() {
      await fetchToken();
      const token = localStorage.getItem("token");

      const data: PatientResponse[] = await fetch(
        "http://localhost:4004/api/patients",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((response) => response.json())
        .catch((e) => console.error(e));
      setTestPatients(data);
      setLoading(false);
    }

    fetchPatients();
  }, []);

  function updatePut(patientResponse: PatientResponse) {
    setTestPatients(
      testPatients.map((p) =>
        p.id === patientResponse.id ? patientResponse : p
      )
    );
    setEditPatient(false);
  }

  function updateDelete(patientId: string) {
    setTestPatients(testPatients.filter((p) => p.id !== patientId));
    setDeletePatient(false);
  }

  function updatePost(patientResponse: PatientResponse) {
    setTestPatients([...testPatients, patientResponse]);
    setCreatePatient(false);
  }

  return (
    <>
      <NavBar></NavBar>

      <div className={"p-10"}>
        {!loading ? (
          <Table
            patients={testPatients}
            handleEditPatient={setEditPatient}
            handleDeletePatient={setDeletePatient}
            handleCreatePatient={setCreatePatient}
          ></Table>
        ) : (
          <div></div>
        )}
        {editPatient ? (
          <div
            className={
              "absolute inset-0 content-center backdrop-brightness-75 backdrop-blur-[1px] transition-all duration-600"
            }
          >
            <PatientEditPopUp
              patient={editPatient}
              cancelFunc={() => setEditPatient(false)}
              updateFunc={updatePut}
            ></PatientEditPopUp>
          </div>
        ) : (
          <div></div>
        )}
        {deletePatient ? (
          <div
            className={
              "absolute inset-0 content-center backdrop-brightness-75 backdrop-blur-[1px] transition-all duration-600"
            }
          >
            <PatientDeletePopUp
              patient={deletePatient}
              cancelFunc={() => setDeletePatient(false)}
              updateFunc={updateDelete}
            ></PatientDeletePopUp>
          </div>
        ) : (
          <div></div>
        )}
        {createPatient ? (
          <div
            className={
              "absolute inset-0 content-center backdrop-brightness-75 backdrop-blur-[1px] transition-all duration-600"
            }
          >
            <PatientCreatePopUp
              cancelFunc={() => setCreatePatient(false)}
              updateFunc={updatePost}
            ></PatientCreatePopUp>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}
