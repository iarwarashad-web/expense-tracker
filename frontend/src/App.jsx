import { useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import NavBar from './layouts/NavBar.jsx'
import SideBar from './layouts/SideBar.jsx'
import Home from './pages/Dashboard/Home'
import NotFound from './pages/components/NotFound.jsx'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import Income from './pages/Dashboard/Income.jsx'
import Expense from './pages/Dashboard/Expenses.jsx'
import UserProvider from './pages/contexts/userContext.jsx'
import ProtectedRoute from './pages/contexts/ProtectedRoute.jsx'
import LandingPage from './pages/LandingPage.jsx'
function App() {
 

  return (
  
    <BrowserRouter>
      <UserProvider>
      <Routes>
       
      
        <Route path="/dashboard" element={<Home/>} />
         <Route path="/income" element={<Income/>} />
      <Route path="/expenses" element={<Expense/>} />
     <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="*" element={< NotFound />} />
        </Routes>
        </UserProvider>
    </BrowserRouter>
  
  )
}

export default App



