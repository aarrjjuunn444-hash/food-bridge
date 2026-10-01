import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import DonorDashboard from './pages/DonorDashboard'
import OrganizationDashboard from './pages/OrganizationDashboard'
import AddFood from './pages/AddFood'
import AvailableFood from './pages/AvailableFood'
import MyRequests from './pages/MyRequests'
import DonorRequests from './pages/DonorRequests'
import Impact from './pages/Impact'
import EditFood from './pages/EditFood'
import Footer from './components/Footer'
import Pnf from './components/Pnf'

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/impact" element={<Impact />} />

        <Route
          path="/donor-dashboard"
          element={
            <Pnf role="donor">
              <DonorDashboard />
            </Pnf>
          }
        />

        <Route
          path="/add-food"
          element={
            <Pnf role="donor">
              <AddFood />
            </Pnf>
          }
        />

        <Route
          path="/donor-requests"
          element={
            <Pnf role="donor">
              <DonorRequests />
            </Pnf>
          }
        />

        <Route
          path="/edit-food/:id"
          element={
            <Pnf role="donor">
              <EditFood />
            </Pnf>
          }
        />

        <Route
          path="/organization-dashboard"
          element={
            <Pnf role="organization">
              <OrganizationDashboard />
            </Pnf>
          }
        />

        <Route
          path="/available-food"
          element={
            <Pnf role="organization">
              <AvailableFood />
            </Pnf>
          }
        />

        <Route
          path="/my-requests"
          element={
            <Pnf role="organization">
              <MyRequests />
            </Pnf>
          }
        />

      </Routes>

      <Footer />

    </BrowserRouter>
  )
}

export default App