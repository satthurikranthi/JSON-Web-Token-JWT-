import logo from './logo.svg';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
import Task from './components/Task';
import Leaves from './components/Leaves';
import EditProfile from './components/EditProfile';

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Login></Login>}></Route>
    <Route path="signup" element={<Signup></Signup>}></Route>
    <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
    <Route path="/task" element={<Task></Task>}></Route>
    <Route path="/leaves" element={<Leaves></Leaves>}></Route>
    <Route path="/editprofile" element={<EditProfile></EditProfile>}></Route>
   

   </Routes>
   </BrowserRouter>
  );
}

export default App;
