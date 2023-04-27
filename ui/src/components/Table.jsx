import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

function Table({ list, title, role }) {
  const [open, setOpen] = useState(false);
  const [access, setAccess]= useState(false)

  // useEffect(()=>{
  //   async function grantAccess(){
  //     const resp = fetch("http://localhost:8080/ehospital/AddAccessServlet",{
  //       method: "GET",
  //     });
  //     const access = await resp.json();
  //     console.log(access)
  //   }
  //   grantAccess()
  // },[]);

  console.log(role);
  const handleOpen = () => setOpen(!open);
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
                className="px-10 py-5 cursor-pointer hover:text-indigo-500"
                onClick={handleOpen}
              >
                {user.name}
              </td>
              <td className="px-10 py-5">{user.Age}</td>
              <td className="px-10 py-5">{user.email}</td>
              <td className="px-10 py-5">{user.phone}</td>
              {role === "patient" ? (
                <td className="flex justify-center py-2 px-5">
                  {access ? <button onClick={()=>setAccess(!access)} className=" py-2 px-5 inline-flex items-center font-bold w-40 text-footerbg bg-blue-100  hover:bg-blue-200 duration-200 rounded-md">
                    Remove Access
                  </button> :
                  <button onClick={()=>setAccess(!access)} className="inline-flex items-center px-5 py-2 bg-primaryColor text-white  w-40 font-bold rounded-md">
                    Grant Access
                  </button>}
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader> Provide Medecines</DialogHeader>
        <DialogBody divider>
        <div className="role col-start-1 mt-5">
            <select
              className="px-20 rounded-2xl h-12 outline-teal-500"
            >
              <option selected value="">
                Select Medecine
              </option>
              <option value="patient">Hybiprofen</option>
              <option value="pharmacist">Acetaminophen</option>
              <option value="physician">Paracetamol</option>
            </select>
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
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default Table;
