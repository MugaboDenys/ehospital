import logo from "/logo.png";
import hero from "/hero.png";
import landing from "/landing.png";
import {AiOutlineLogin} from "react-icons/ai"
import {CgProfile} from "react-icons/cg"

function Landing() {
  return (
    <div className="relative bg-gradient-to-b from-teal-100/40 to-teal-800/40 h-screen overflow-hidden">
      <div className="flex justify-between mb-10 px-32 py-10 relative z-20 ">
        <a href={"/"}>
          <div className="flex items-center gap-x-3 transform hover:scale-105 duration-200">
            <div className="">
              <img src={logo} className="w-[18rem] " alt="logo" />
            </div>
          </div>
        </a>
        <div className="flex gap-x-10 text-teal-700">
          <a href={"/about"} className="hover:text-teal-900">
            About
          </a>
          <a href={"/services"} className="hover:text-teal-900">
            Our Services
          </a>
          <a href={"/contact"} className="hover:text-teal-900">
            Contact
          </a>
        </div>
        <div>
          <a
            href={"/"}
            className="px-6 py-2 bg-primaryColor text-white text-xs font-bold rounded-md transform hover:scale-105"
          >
            Need a Physician?
          </a>
        </div>
      </div>
      <img src={hero} className="absolute right-0 top-16 z-10 opacity-30 " alt="" />
      <img src={landing} className="absolute left-72 opacity-10 top-16 z-10 " alt="" />
      <div className="px-32 my-10 flex gap-5 relative z-20">
        <div className="w-1/2 flex flex-col justify-center">
          <h2 className="text-6xl font-bold text-footerbg">
            Welcome to eHospital,
          </h2>
          <p className="text-teal-700 text-2xl mt-16">
            The online medical platform that brings healthcare to your
            fingertips
          </p>
          <div className="mt-10 text-white flex items-center space-x-5 pt-20">
            <a
              href={"/login"}
              className="py-2 px-5 inline-flex items-center font-bold bg-primaryColor shadow-lg shadow-primaryColor hover:bg-footerbg duration-200 rounded-md"
            >
             Login <span><AiOutlineLogin className="text-3xl"/> </span>
            </a>
            <a
              href={"/signup"}
              className=" py-2 px-5 inline-flex items-center font-bold text-footerbg bg-blue-100  hover:bg-blue-200 duration-200 rounded-md"
            >
              Signup <CgProfile className="text-3xl"/> 
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
