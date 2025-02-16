import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Route, Router, Routes } from 'react-router'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import Home from './Pages/Home'
import UserDashboard from './Pages/user/Dashboard'
import AdminDashboard from './Pages/admin/Dashboard'
import ProtectedRoute from "./components/ProtectedRoute";
import BrowseJobs from './Pages/BrowseJobs'
import AppliedJobs from './Pages/user/AppliedJobs'
import ViewApplications from './Pages/admin/ViewApplications'


const PrivateRoute = ({ children, roleRequired }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/signin" />;
  if (roleRequired && role !== roleRequired) return <Navigate to="/" />;

  return children;
};
function App(){
  return (
    <>
    <Routes>
      <Route path='/'element={<><Navbar /><Home /></>} />
      <Route path='/signin'element={<><Navbar /><Signin /></>}/>
      <Route path='/signup' element={<><Navbar /><Signup /></>}/>
      <Route path="/browse-jobs" element={<BrowseJobs />} />
        {/* 🔹 User Protected Route */}
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/applied-jobs" element={<AppliedJobs />} />
        </Route>

        {/* 🔹 Admin Protected Route */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/applications" element={<ViewApplications />} />
        </Route>
    </Routes>
    </>
  )
}

export default App
