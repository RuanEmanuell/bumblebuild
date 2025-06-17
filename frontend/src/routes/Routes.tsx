import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import AdminDashboard from "../pages/AdminDashboard";
import PartDashboard from "../pages/PartDashboard";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import UserProfile from "../pages/UserProfile";
import PcConfigForm from "../pages/PcConfigForm";
import ComponentsCadaster from "../pages/ComponentsCadaster";
import History from "../pages/History";

export default function AppRoutes() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element = {<AdminDashboard/>}/>
        <Route path="/parts" element = {<PartDashboard/>}/>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/pc-registration" element={<PcConfigForm />} />
        <Route path="/components-cadaster" element={<ComponentsCadaster />} />
        <Route path="/history" element={<History />} />
        <Route path="*" element={<Navigate to="/" replace />} />
       </Routes>
  );
}