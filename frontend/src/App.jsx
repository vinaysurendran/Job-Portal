import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Route, Router, Routes } from 'react-router'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import Home from './Pages/Home'
import UserDashboard from './Pages/user/UserDashboard'
import AdminDashboard from './Pages/admin/AdminDashboard'


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
    <Navbar/>
    <Routes>
      <Route path='/'Component={Home}/>
      <Route path='/signin'Component={Signin}/>
      <Route path='/signup' Component={Signup}/>
      <Route path="/user/dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
      <Route path="/admin/dashboard" element={<PrivateRoute roleRequired="admin"><AdminDashboard /></PrivateRoute>} />
    </Routes>
    </>
  )
}

export default App
