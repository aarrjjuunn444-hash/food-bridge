import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const savedUser = localStorage.getItem('foodBridgeUser')

    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('foodBridgeUser')
    setUser(null)
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">

        <Link className="navbar-brand fw-bold fs-4" to="/">
          🍲 FoodBridge
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav ms-auto align-items-lg-center">

            <li className="nav-item">
              <Link className="nav-link px-3" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link px-3" to="/about">
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link px-3" to="/impact">
                Impact
              </Link>
            </li>

            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link px-3" to="/login">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="btn btn-success ms-lg-2 px-3" to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="btn btn-outline-light ms-lg-2 px-3"
                    to={
                      user.role === 'donor'
                        ? '/donor-dashboard'
                        : '/organization-dashboard'
                    }
                  >
                    Dashboard
                  </Link>
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-danger ms-lg-2 mt-2 mt-lg-0 px-3"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

          </ul>

        </div>
      </div>
    </nav>
  )
}

export default Navbar