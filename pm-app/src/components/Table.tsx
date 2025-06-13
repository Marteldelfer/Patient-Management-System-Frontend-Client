import type { PatientResponse } from "../screens/PatientScreen.tsx";
import { GoPlus } from "react-icons/go";

interface HeaderProps {
  className?: string;
}

interface RowProps {
  patient: PatientResponse;
  className?: string;
  handleEditPatient: (patient: PatientResponse) => void;
  handleDeletePatient: (patient: PatientResponse) => void;
}

interface TableProps {
  patients: PatientResponse[];
  className?: string;
  handleEditPatient: (patient: PatientResponse) => void;
  handleDeletePatient: (patient: PatientResponse) => void;
  handleCreatePatient: (valiue: boolean) => void;
}

function camelCaseToWords(s: string): string {
  const result: string = s.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
}

function TableHeader({ className }: HeaderProps) {
  const headers: string[] = [
    "name",
    "email",
    "address",
    "dateOfBirth",
    "Action",
  ];
  return (
    <>
      <thead className={className}>
        <tr>
          {headers.map((p: string) => (
            <th className={"text-center p-1"} key={p}>
              {camelCaseToWords(p)}
            </th>
          ))}
        </tr>
      </thead>
    </>
  );
}

function TableRow({
  patient,
  className,
  handleEditPatient,
  handleDeletePatient,
}: RowProps) {
  return (
    <>
      <tr className={className}>
        <td className={"text-center p-1"}>{patient.name}</td>
        <td className={"text-center p-1"}>{patient.email}</td>
        <td className={"text-center p-1"}>{patient.address}</td>
        <td className={"text-center p-1"}>{patient.dateOfBirth}</td>

        <td className={"text-center p-1"}>
          <button
            className={
              "border pl-3 pr-3 rounded-lg mr-1 border-blue-800 transition-all duration-150 cursor-pointer hover:bg-blue-800 hover:text-white"
            }
            onClick={() => handleEditPatient(patient)}
          >
            Edit
          </button>
          <button
            className={
              "border pl-3 pr-3 rounded-lg ml-1 border-red-700 transition-all duration-150 cursor-pointer hover:bg-red-700 hover:text-white"
            }
            onClick={() => handleDeletePatient(patient)}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
}

export function Table({
  patients,
  className,
  handleEditPatient,
  handleDeletePatient,
  handleCreatePatient,
}: TableProps) {
  return (
    <>
      <div
        className={
          "m-auto w-4/5 max-w-5xl p-4 border-2 border-gray-400 rounded-2xl " +
          className
        }
      >
        <table className={"w-full"}>
          <TableHeader className={"border-b-2 border-gray-300"}></TableHeader>
          <tbody>
            {patients.map((p) => (
              <TableRow
                className={"border-b-1 border-gray-300 hover:bg-blue-50"}
                key={p.id}
                patient={p}
                handleEditPatient={handleEditPatient}
                handleDeletePatient={handleDeletePatient}
              ></TableRow>
            ))}
            <tr
              className={
                "text-center text-2xl transform duration-200 hover:text-4xl cursor-pointer p-2 active:bg-blue-100 hover:bg-blue-50 group"
              }
              onClick={() => handleCreatePatient(true)}
            >
              <td colSpan={5} className="pb-1.5">
                <GoPlus
                  className={`inline-block transform-all duration-400 rounded-4xl border border-transparent group-active:border-3
										group-hover:border-blue-800 group-hover:text-blue-800 group-active:text-white group-active:border-white`}
                ></GoPlus>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
