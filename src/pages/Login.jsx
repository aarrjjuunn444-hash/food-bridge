import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { loginAPI } from '../services/allAPI'
import { toast } from 'react-toastify'
import { GiBowlOfRice, GiMeal } from "react-icons/gi"

function Login() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!loginData.email || !loginData.password) {
      toast.error('Please fill all fields')
      return
    }

    try {
      const response = await loginAPI()

      const user = response.data.find(
        (item) =>
          item.email === loginData.email &&
          item.password === loginData.password
      )

      if (user) {
        localStorage.setItem(
          'foodBridgeUser',
          JSON.stringify(user)
        )

        if (user.role === 'donor') {
          window.location.href = '/donor-dashboard'
        } else if (user.role === 'organization') {
          window.location.href = '/organization-dashboard'
        }
      } else {
        toast.error('Invalid email or password')
      }

    } catch (error) {
      console.log(error)
      toast.error('Login failed. Please try again.')
    }
  }

  return (
    <div className="container-fluid py-4 py-md-5" style={{background:'linear-gradient(135deg, #2c72eb, #eb27a6, #27f0e0)', minHeight:'90vh'}}>
      <div className="row justify-content-center">

        <div className="col-12 col-sm-10 col-md-7 col-lg-5">

          <div className="card shadow border-0">

            <div className="card-body p-4 p-md-5">

              <h2 className="text-center fw-bold mb-2 text-success">
                <GiBowlOfRice /> Welcome Back
              </h2>

              <p className="text-center text-muted mb-4">
                Login to continue using FoodBridge
              </p>

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Email
                  </label>

                  <input type="email" className="form-control" placeholder="Enter your email" value={loginData.email} onChange={(e) =>  setLoginData({  ...loginData, email: e.target.value  }) }  required/>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({
                        ...loginData,
                        password: e.target.value
                      })
                    }
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100"
                >
                  <GiMeal /> Login
                </button>

              </form>

              <p className="text-center mt-4 mb-0">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-success fw-semibold"
                >
                  Register
                </Link>
              </p>

              <div className="text-center mt-3">
                <Link to="/" className="text-decoration-none text-muted">
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

export default Login