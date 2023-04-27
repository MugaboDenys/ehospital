import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return ( 
    <div>
      <Routes>
				{/* <Route path='/signup' element={<Signup />} /> */}
				<Route path='/' element={<Landing />} />
				<Route path='/login' element={<Login />} />
				<Route path='/dashboard' element={<Dashboard />} />
				<Route path='/signup' element={<Signup />} />
				<Route path='/landing' element={<Landing />} />
			</Routes>
    </div>
   );
}
 
export default App;