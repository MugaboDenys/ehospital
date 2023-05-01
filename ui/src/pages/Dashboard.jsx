import logo from "/logo.png";
import hero from "/hero.png";
import landing from "/landing.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  textarea,
} from "@material-tailwind/react";
import Table from "../components/Table";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [access, setAccess] = useState(false);
  const [open, setOpen] = useState(false);
 
  const handleOpen = () => setOpen(!open);
 

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"))
  const username = user ?.username;
  const identifier = user ?.phone;
  const role = user ?.userType;
  console.log(user,"<<<<<<<<<<<<<<<<<<<<<<<<<<<");
  useEffect(() => {
    const loggedIn = () => (user ? navigate("/dashboard") : "");
    loggedIn();
  }, []);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(
          "http://localhost:5500/api/v1/list-users",
          {
            method: "GET",
          }
        );
        const users = await response.json();
        setData(users.datas);
      } catch (err) {
        console.log(err);
      }
    }
    fetchUsers();
  }, []);
  console.log(data);
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const handleDownload = async (patient, results, medicine) => {
    try {
      const body = {
        patientName: patient,
        results: results,
        medicine: medicine
      };
      console.log(results)
      const response = await fetch("http://localhost:5500/api/v1/downloadCSV", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
  
      const csvBlob = await response.blob();
  
      const downloadLink = document.createElement("a");
      downloadLink.href = window.URL.createObjectURL(csvBlob);
      downloadLink.download = "data.csv";
  
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      alert(error);
    }
  };
  
  const usersArray = Object.values(data);
  
  const pharmacistUsers = usersArray
    .filter((user) => user.userType === "pharmacist")
    .sort((a, b) => (a.Age < b.Age ? -1 : 1));
  const physicianUsers = usersArray
    .filter((user) => user.userType === "physician")
    .sort((a, b) => (a.name < b.name ? -1 : 1));
    const patient = usersArray
    .filter((user) => user.userType === "patient")
    .sort((a, b) => (a.name < b.name ? -1 : 1));  

  return (
    <div className="relative bg-gradient-to-b from-teal-100/40 to-teal-800/40 min-h-screen overflow-hidden">
      <Dialog className="absolute top-10 right-10" open={open} handler={handleOpen}>
        <DialogHeader>{user.name}Profile </DialogHeader>
        <DialogBody divider>
          <h2 className="font-bold">Lab Results :</h2>
          <p>{user.physicianDescription}</p>
          <h2 className="font-bold">Suggested Medecines :</h2>
          <p>{user.pharmacistMeds}</p>
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
          <Button variant="gradient" color="green" onClick={()=>handleDownload(username,user.physicianDescription, user.pharmacistMeds)}>
            <span>Download csv file</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <img
        src={hero}
        className="absolute right-0 top-16 z-10 opacity-30 "
        alt=""
      />
      <img
        src={landing}
        className="absolute left-72 opacity-10 top-16 z-10 "
        alt=""
      />
      <div className="flex justify-between mb-10 px-32 py-10 relative z-20 ">
        <a href={"/"}>
          <div className="flex items-center gap-x-3 transform hover:scale-105 duration-200">
            <div className="">
              <img src={logo} className="w-[18rem] " alt="logo" />
            </div>
          </div>
        </a>

        <div className="flex gap-5">
          <a
            href={"/"}
            onClick={handleLogout}
            className="inline-flex items-center px-6 py-2 bg-primaryColor text-white text-xs font-bold rounded-md transform hover:scale-105"
          >
            Logout{" "}
            <span>
              <AiOutlineLogin className="text-3xl" />
            </span>
          </a>
          {role === "patient" ? <button
            onClick={handleOpen}
            className="inline-flex items-center px-6 py-2 bg-primaryColor text-white text-xs font-bold rounded-md transform hover:scale-105"
          >
            My Account
            <span>
              <CgProfile className="text-3xl" />
            </span>
          </button> : null}
        </div>
      </div>
      <h2 className="title text-teal-500 text-center font-extrabold text-3xl">
        {`Welcome to Ehospital ${username}`}
      </h2>
      {role !== "patient" && <h2 className="title uppercase pt-5 text-teal-500 text-center font-extrabold text-3xl">
        {` ${role}s`}
      </h2>}
      <div className=" mt-10 relative z-20 flex justify-center  gap-2 p-6">
        {role === "patient" ? (
          <div className="flex flex-col gap-10">
            <div>
              <Table list={physicianUsers} title={"Physicians"} role={role} userName={username} identify={identifier} />
            </div>
            <div>
              <Table list={pharmacistUsers} title={"Pharmacist"} role={role} userName={username} identify={identifier}/>
            </div>
            
          </div>
        ) : (
          <div>
            <Table list={patient} title={"Patients"} role={role} userName={username}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
