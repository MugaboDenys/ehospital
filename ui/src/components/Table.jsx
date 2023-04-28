import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  textarea,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";

function Table({ list, title, role, identify, userName }) {
  const [open, setOpen] = useState(false);
  const [accessStates, setAccessStates] = useState({});
  const [selected, setSelected] = useState("")
  const [input, setInput] = useState("")
  const [userData, setUserData] = useState({
    username : "",gender : "", Age : 0, physicianDescription : "Histopathological: Done by a pathologist after examining sample tissue under a microscope", pharmacistMeds : ""
  });

  const user = JSON.parse(localStorage.getItem("user"))
  const handleClick = (username, user, role) => {
    console.log(username, user, role)
    const data = {
      userType: role,
      username: user ,
      patientUsername: username,
    };
  console.log(username)
    axios
      .post("http://localhost:5500/api/v1/addAccess", data)
      .then((response) => {
        console.log("sent===>>>", response);
         setAccessStates({
          ...accessStates,
          [user]: true,
        });
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };  
  const handleInput = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = (role,identifier, patient, selected, input) => {
    console.log(identify)
    const data = role === "pharmacist" ?
    {
      userType: role,
      identifier,
      patientUsername: patient,
      meds: selected
    }:
    {
      userType: role,
      identifier,
      patientUsername: patient,
      diseaseDescription: input
    };
  
    axios
      .post("http://localhost:5500/api/v1/AddDescriptionServlet", data)
      .then((response) => {
        console.log("sent===>>>", response);
      })
      .catch((error) => {
        console.log(error.response.statusText)
        alert(`${error.message} ${error.response.statusText}`);
      });
      setOpen(!open)
  };  
  const handleOpen = (username, gender, Age, physicianDescription) => {
    setUserData(prevD=>{
      return{...prevD, username, gender, Age, physicianDescription}
    })
    setOpen(!open)
  };
  const selectDropdown = (e) => {
    const val = e.target.value;
    setSelected(val);
  };
  return (
    <div>
      <h2 className="text-center pb-5 text-2xl">{title}</h2>
      <table className="bg-white/20 shadow-xl px-10 py-10 rounded-md min-w-[62rem]">
        <thead>
          <tr>
            <th className="py-5 px-16">Name</th>
            <th>Age</th>
            <th>Email</th>
            <th className="py-5 px-32">Phone</th>
            {role === "patient" ? <th className="">Grant Access</th> : null}
          </tr>
        </thead>
        <tbody>
          {list.map((user) => (
            <tr key={user.username} className="border-t-2 border-teal-300">
              <td
                className={`px-10 py-5 cursor-pointer ${role !== "patient" && "hover:text-indigo-500"}`}
                onClick={role !== "patient" ? ()=>handleOpen(user.username, user.gender, user.Age, user.physicianDescription, user.pharmacistMeds) : null}
              >
                {user.name}
              </td>
              <td className="px-10 py-5">{user.Age}</td>
              <td className="px-10 py-5">{user.email}</td>
              <td className="px-10 py-5">{user.phone}</td>
              {role === "patient" ? (
                <td className="flex justify-center py-2 px-5">
                
                  {accessStates[user.uniqueIdentifier] ? <label className=" py-2 px-5 inline-flex items-center font-bold w-40 text-footerbg bg-blue-100  hover:bg-blue-200 duration-200 rounded-md">
                    Access Granted
                  </label> :
                  <button onClick={()=>handleClick(userName, user.uniqueIdentifier, user.userType)} className="inline-flex items-center px-5 py-2 bg-primaryColor text-white  w-40 font-bold rounded-md">
                    Grant Access
                  </button>}
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>{role === "physician" ? "Diagnose" : "Provide Medecine for"}</DialogHeader>
        <div className="flex justify-center gap-10 mb-10">
            <h2>{userData.username}</h2>
            <h2>{userData.gender}</h2>
            <h2>{userData.Age}</h2>
          </div>
        <DialogBody divider>
        <div className="role col-start-1 mt-5">
         <div className="pb-10">
          {role === "physician" ? <textarea className="border-green-500 border-2 rounded-lg outline-none px-5" onChange={handleInput} value={input} placeholder="Lab Results" rows={5} cols={40}/>:<p>{userData.physicianDescription}</p>}
         </div>
           {role === "pharmacist" ?  <select
            onChange={selectDropdown}
              className="px-20 rounded-2xl h-8 outline-teal-500"
            >
              <option selected value="">
                Select Medecine
              </option>
              <option value="Hybiprofen">Hybiprofen</option>
              <option value="Acetaminophen">Acetaminophen</option>
              <option value="Paracetamol">Paracetamol</option>
            </select>: null}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={()=>handleSubmit(role,role === "pharmacist" ?user?.phone : user?.email,userData.username,selected, input)}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default Table;
