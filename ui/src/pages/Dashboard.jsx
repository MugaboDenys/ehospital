import logo from "/logo.png";
import hero from "/hero.png";
import landing from "/landing.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import Table from "../components/Table";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [access, setAccess] = useState(false);

  const navigate = useNavigate();

  const user = localStorage.getItem("user") && localStorage.getItem("user");
  const username = user === null ? "" : JSON.parse(user).username;
  const role = user === null ? "" : JSON.parse(user).userType;
  console.log(user);
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
  const usersArray = Object.values(data);
  // const uniqueId = usersArray.filter(i=>i.userType === "patient").map(usr=>usr.pharmacists).filter(arr=>arr.length > 0)[0][0].uniqueIdentifier;

  const AccArr = usersArray.filter(i => i.userType === "patient").flatMap(usr => usr.pharmacists).filter(Boolean);

  console.log(AccArr, "<<<<<<<<+++++")
  
  const pharmacistUsers = usersArray
    .filter((user) => user.userType === "pharmacist")
    .sort((a, b) => (a.Age < b.Age ? -1 : 1));
  const physicianUsers = usersArray
    .filter((user) => user.userType === "physician")
    .sort((a, b) => (a.name < b.name ? -1 : 1));
    const patient = usersArray
    .filter((user) => user.userType === "patient")
    .sort((a, b) => (a.name < b.name ? -1 : 1));  

    const physicianAccess = (physicianName, Arr) =>{

    }
  return (
    <div className="relative bg-gradient-to-b from-teal-100/40 to-teal-800/40 min-h-screen overflow-hidden">
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

        <div>
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
              <Table list={physicianUsers} title={"Physicians"} role={role} userName={username} />
            </div>
            <div>
              <Table list={pharmacistUsers} title={"Pharmacist"} role={role} userName={username}/>
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
