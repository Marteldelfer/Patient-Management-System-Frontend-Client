import "../index.css";
import type {
  PatientResponse,
} from "../screens/PatientScreen.tsx";
import { useRef, useState } from "react";

interface PatientPostRequest {
  name: string;
  email: string;
  address: string;
  dateOfBirth: string;
  registeredDate: string;
}

interface PatientCreatePopUpProps {
  updateFunc: (patientResponse: PatientResponse) => void;
  cancelFunc: () => void;
  className?: string;
}

export function PatientCreatePopUp({
  updateFunc,
  cancelFunc,
  className,
}: PatientCreatePopUpProps) {
  const name = useRef("");
  const email = useRef("");
  const address = useRef("");
  const dateOfBirth = useRef("");

  const [loading, setLoading] = useState(false);

  function handleCreatePatient(
    request: PatientPostRequest,
    updateFunc: (patientResponse: PatientResponse) => void
  ) {
    setLoading(true);
    const token = localStorage.getItem("token");
    console.log(request)

    fetch("http://localhost:4004/api/patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(request),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        updateFunc(data);
        console.log(data)
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }
  const loadingFilter = loading ? "brightness-80" : "";

  return (
    <>
      <div className={className}>
        <div
          className={
            "m-auto w-4/5 max-w-md rounded-3xl transition-all duration-100 bg-white shadow-2xl p-8 " +
            loadingFilter
          }
        >
          <div className="flex items-center justify-between">
            <div className={"w-1/3"}>
              <label htmlFor="patientName" className={"p-4"}>
                Name
              </label>
            </div>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => {
                name.current = e.target.value;
                console.log(name.current)
              }}
              className={
                "border-1 border-gray-300 p-1 pl-3 rounded-2xl m-1 w-2/3"
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div className={"w-1/3"}>
              <label htmlFor="patientEmail" className={"p-4"}>
                Email
              </label>
            </div>
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => {
                email.current = e.target.value;
                console.log("email", email.current);
              }}
              className={
                "border-1 border-gray-300 p-1 pl-3 rounded-2xl m-1 w-2/3"
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className={"w-1/3"}>
              <label htmlFor="patientAddress" className={"p-4"}>
                Address
              </label>
            </div>
            <input
              type="text"
              placeholder="Address"
              onChange={(e) => {
                address.current = e.target.value;
                console.log(address.current);
              }}
              className={
                "border-1 border-gray-300 p-1 pl-3 rounded-2xl m-1 w-2/3"
              }
            />
          </div>

          <div className={"flex items-center justify-between"}>
            <div className={"w-1/3"}>
              <label htmlFor="patientDateOfBirth" className={"p-4"}>
                Date of birth
              </label>
            </div>
            <input
              type="date"
              placeholder="Date"
              onChange={(e) => {
                dateOfBirth.current = e.target.value.toString();
                console.log(dateOfBirth.current);
              }}
              className={
                "border-1 border-gray-300 p-1 pl-3 rounded-2xl m-1 w-2/3"
              }
            />
          </div>

          <div className={"text-center pt-4"}>
            <button
              type="submit"
              onClick={() => {
                if (!loading) {
                  handleCreatePatient(
                    {
                      name: name.current,
                      email: email.current,
                      address: address.current,
                      dateOfBirth: dateOfBirth.current.toString(),
                      registeredDate: new Date().toJSON().slice(0,10)
                    },
                    updateFunc
                  );
                } else {
                  return;
                }
              }}
              className={
                "border-2 rounded-xl p-1 pl-3 pr-3 border-blue-800 m-1 ml-3 mr-3 transform duration-150 cursor-pointer hover:bg-blue-800 hover:text-white"
              }
            >
              Create Patient
            </button>
            <button
              onClick={cancelFunc}
              className={
                "border-2 rounded-xl p-1 pl-3 pr-3 border-red-700 m-1 ml-3 mr-3 transform duration-150 cursor-pointer hover:bg-red-700 hover:text-white"
              }
            >
              Cancel
            </button>
          </div>
        </div>

        {loading ? (
          <div
            role="status"
            className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
          >
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="none"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
