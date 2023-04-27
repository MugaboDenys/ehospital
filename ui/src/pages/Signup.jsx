import axios from "axios";
import logo from "/logo.png";
import hero from "/hero.png";
import landing from "/landing.png";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import { useState } from "react";

const Signup = () => {
  const [selected, setSelected] = useState("");

  const selectDropdown = (e) => {
    const val = e.target.value;
    setSelected(val);
  };
  const [values, setValues] = useState({
    userType: "",
    name: "",
    age: "",
    gender: "",
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5500/api/v1/signup", {
        ...values,
        userType: selected,
      })
      .then(function (response) {
        alert(response.data.message);
        console.log(response, "response");
        navigate("/login");
      })
      .catch(function (error) {
        alert(error.response.data.message);
        console.log(error.response, "error");
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative bg-gradient-to-b from-teal-100/40 to-teal-800/40 h-screen overflow-hidden">
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
      </div>
      <h2 className="title text-teal-500 text-center font-extrabold text-3xl">
        Create account to Ehospital
      </h2>
      <div className=" mt-10 relative z-20 flex justify-center  gap-2 p-6">
        <div className="heading"></div>
        <form
          onSubmit={handleFormSubmit}
          className="grid grid-cols-2 gap-2 recol-start-1 relative justify-center bg-white/20 shadow-xl w-fit px-10 py-10 rounded-md"
        >
          <input
            className="input px-5 rounded-2xl h-12 outline-teal-500"
            type="text"
            name="name"
            value={values.name}
            placeholder="name..."
            onChange={handleChange}
          ></input>

          <input
            className="input px-5 rounded-2xl h-12 outline-teal-500"
            type="text"
            name="username"
            value={values.username}
            placeholder="username..."
            onChange={handleChange}
          ></input>
          <input
            className="input px-5 rounded-2xl h-12 outline-teal-500"
            type="email"
            name="email"
            value={values.email}
            placeholder="Email..."
            onChange={handleChange}
          ></input>
          <input
            className="input px-5 rounded-2xl h-12 outline-teal-500"
            type="password"
            name="password"
            value={values.password}
            placeholder="Password..."
            onChange={handleChange}
          ></input>
          <input
            className="input px-5 rounded-2xl h-12 outline-teal-500"
            type="number"
            name="age"
            value={values.age}
            placeholder="Age..."
            onChange={handleChange}
          ></input>
          <div className="col-start-1">
          <label htmlFor="gender" className="gender-label">
            Gender
          </label>
          <div className="gender flex gap-4 ">
            <div>
              <input
                type="radio"
                name="gender"
                onChange={handleChange}
                value="Male"
              />
              <label htmlFor="male">Male</label>
            </div>
            <div>
              <input
                type="radio"
                name="gender"
                onChange={handleChange}
                value="Female"
              />
              <label htmlFor="female">Female</label>
            </div>
            <div>
              <input
                type="radio"
                name="gender"
                onChange={handleChange}
                value="Other"
              />
              <label htmlFor="other">Other</label>
            </div>
          </div>
          </div>

          <div className="role col-start-1 mt-5">
            <select
              onChange={selectDropdown}
              className="px-32 rounded-2xl h-12 outline-teal-500"
            >
              <option selected value="">
                Select Role
              </option>
              <option value="patient">patient</option>
              <option value="pharmacist">pharmacist</option>
              <option value="physician">physician</option>
            </select>
          </div>
          <div className="flex justify-center space-x-5 mt-32 items-center">
            <button
              className=" py-2 px-5 ml-3 inline-flex items-center font-bold text-footerbg bg-blue-100  hover:bg-blue-200 duration-200 rounded-md"
              type="submit"
              onClick={handleFormSubmit}
            >
              Create Account
            </button>
            <a
              className="py-2 px-5 inline-flex text-white items-center font-bold bg-primaryColor shadow-lg shadow-primaryColor hover:bg-footerbg duration-200 rounded-md"
              href="/login"
            >
              Login
              <span>
                <AiOutlineLogin className="text-3xl" />
              </span>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
