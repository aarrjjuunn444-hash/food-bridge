import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerAPI } from '../services/allAPI'
import { toast } from 'react-toastify'
import { GiBowlOfRice, GiMeal } from "react-icons/gi"

function Register() {
  const navigate = useNavigate()

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  })

  const handleRegister = async (e) => {
    e.preventDefault()

    if (
      !userData.name ||
      !userData.email ||
      !userData.password ||
      !userData.role
    ) {
      toast.error('Please fill all fields')
      return
    }

    try {
      const response = await registerAPI(userData)

      if (response.status === 201) {
        toast.success('Registration successful!')

        setUserData({
          name: '',
          email: '',
          password: '',
          role: ''
        })

        setTimeout(() => {
          navigate('/login')
        }, 1000)
      }
    } catch (error) {
      console.log(error)
      toast.error('Registration failed. Please try again.')
    }
  }

  return (
    <div className="container-fluid py-4 py-md-5" style={{background:'linear-gradient( #6a521d, #537875)', minHeight:'90vh'}}>
      <div className="row justify-content-center">

        <div className="col-12 col-sm-10 col-md-7 col-lg-5">

          <div className="card shadow border-0">

            <div className="card-body p-4 p-md-5">

              <h2 className="text-center fw-bold mb-2 text-success">
                <GiBowlOfRice /> Create Account
              </h2>

              <p className="text-center text-muted mb-4">
                Join FoodBridge and help reduce food waste
              </p>

              <form onSubmit={handleRegister}>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Full Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your full name"
                    value={userData.name}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        name: e.target.value
                      })
                    }
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={userData.email}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        email: e.target.value
                      })
                    }
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    placeholder="Create a password"
                    value={userData.password}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        password: e.target.value
                      })
                    }
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Register As
                  </label>

                  <select
                    className="form-select"
                    value={userData.role}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        role: e.target.value
                      })
                    }
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="donor">Donor</option>
                    <option value="organization">
                      Organization
                    </option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100"
                >
                  <GiMeal /> Create Account
                </button>

              </form>

              <p className="text-center mt-4 mb-0">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-success fw-semibold"
                >
                  Login
                </Link>
              </p>

              <div className="text-center mt-3">
                <Link
                  to="/"
                  className="text-decoration-none text-muted"
                >
                  ← Back to Home
                </Link>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Register