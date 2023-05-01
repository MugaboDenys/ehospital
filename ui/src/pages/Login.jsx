import axios from "axios";
import logo from "/logo.png";
import hero from "/hero.png";
import landing from "/landing.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";

const Login = () => {
  const [values, setValues] = useState({
    uniqueIdentifier: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5500/api/v1/login", {
        ...values,
      })
      .then(function (response) {
        
        localStorage.setItem("user", JSON.stringify(response.data.data));
        navigate("/dashboard");
      })
      .catch(function (error) {
        alert(error.response.data.message);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div className="relative bg-gradient-to-b from-teal-100/40 to-teal-800/40 h-screen overflow-hidden">
        <img src={hero} className="absolute right-0 top-16 z-10 opacity-30 " alt="" />
      <img src={landing} className="absolute left-72 opacity-10 top-16 z-10 " alt="" />
      <div className="flex justify-between mb-10 px-32 py-10 relative z-20 ">
        <a href={"/"}>
          <div className="flex items-center gap-x-3 transform hover:scale-105 duration-200">
            <div className="">
              <img src={logo} className="w-[18rem] " alt="logo" />
            </div>
          </div>
        </a>
       
      </div>
      <h2 className="title text-teal-500 text-center font-extrabold text-3xl">
            Welcome to Ehospital
          </h2>
      <div className=" mt-10 relative z-20 flex justify-center  gap-2 p-6">
        <div className="heading">
          
        </div>
        <form className="flex justify-center bg-white/20 shadow-xl w-fit px-10 py-10 rounded-md">
          <div className="form space-y-5 flex flex-col">
            <input
              className="input px-5 rounded-2xl h-12 outline-teal-500"
              type="text"
              name="uniqueIdentifier"
              placeholder="Your email address"
              onChange={handleChange}
              required
            />
            <input
              className="input px-5 rounded-2xl h-12 outline-teal-500 "
              type="password"
              name="password"
              placeholder="Create a password"
              onChange={handleChange}
              required
            />
            <div className="flex flex-col items-end gap-5">
              <button
                className="py-2 px-5 inline-flex text-white items-center font-bold bg-primaryColor shadow-lg shadow-primaryColor hover:bg-footerbg duration-200 rounded-md"
                type="submit"
                onClick={handleFormSubmit}
              >
                Login{" "}
                <span>
                  <AiOutlineLogin className="text-3xl" />{" "}
                </span>
              </button>
              <span className="span text-opacity-40 text-black">
                New to our App? Signup!
                <a href="/signup" className=" cursor-pointer py-2 px-5 ml-3 inline-flex items-center font-bold text-footerbg bg-blue-100  hover:bg-blue-200 duration-200 rounded-md">
                Signup 
                </a>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
