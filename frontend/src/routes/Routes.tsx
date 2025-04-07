import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import AdminDashboard from "../pages/AdminDashboard";
import PartDashboard from "../pages/PartDashboard";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element = {<AdminDashboard/>}/>
        <Route path="/parts" element = {<PartDashboard/>}/>
       </Routes>
    </BrowserRouter>
  );
}