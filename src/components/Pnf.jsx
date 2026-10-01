import React from 'react'
import { Navigate } from 'react-router-dom'

function Pnf({ children, role }) {
  const savedUser = localStorage.getItem('foodBridgeUser')

  if (!savedUser) {
    return <Navigate to="/login" />
  }

  const user = JSON.parse(savedUser)

  if (role && user.role !== role) {
    return <Navigate to="/" />
  }

  return children
}

export default Pnf