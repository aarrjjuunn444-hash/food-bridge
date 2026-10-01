import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  getAvailableFoodsAPI,
  getMyRequestsAPI
} from '../services/allAPI'
import { toast } from 'react-toastify'
import { GiBowlOfRice, GiMeal, GiReceiveMoney, GiCheckMark, GiHand } from "react-icons/gi"

function OrganizationDashboard() {
  const [availableFood, setAvailableFood] = useState(0)
  const [myRequests, setMyRequests] = useState(0)
  const [completedRequests, setCompletedRequests] = useState(0)

  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('foodBridgeUser'))

  const getDashboardData = async () => {
    try {
      const foodResponse = await getAvailableFoodsAPI()
      const requestResponse = await getMyRequestsAPI(user.id)

      setAvailableFood(foodResponse.data.length)
      setMyRequests(requestResponse.data.length)

      const completed = requestResponse.data.filter(
        (request) => request.status === 'accepted'
      )

      setCompletedRequests(completed.length)
    } catch (error) {
      console.log(error)
      toast.error('Failed to load dashboard data')
    }
  }

  useEffect(() => {
    getDashboardData()
  }, [])

  return (
    <div className="container-fluid py-4 py-md-5" style={{background:'linear-gradient( #93d127, #d3b60f, #f9fbfb)', minHeight:'90vh'}}>
      <div className="container">

        <button
          className="btn btn-outline-light mb-3"
          onClick={() => navigate('/')}
        >
          ← Back to Home
        </button>

        <div className="mb-4 text-light">
          <h2><GiBowlOfRice /> Organization Dashboard</h2>
          <p className="mb-0">
            Welcome, {user?.name}
          </p>
          <p className="mb-0">
            Find and request available surplus food.
          </p>
        </div>

        <div className="row">

          <div className="col-12 col-sm-6 col-lg-4 mb-4">
            <div className="shadow p-4 rounded text-center h-100 bg-light">
              <GiMeal className="fs-1 text-success" />
              <h3 className="text-success">{availableFood}</h3>
              <p className="mb-0">Available Food</p>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-4 mb-4">
            <div className="shadow p-4 rounded text-center h-100 bg-light">
              <GiReceiveMoney className="fs-1 text-success" />
              <h3 className="text-success">{myRequests}</h3>
              <p className="mb-0">My Requests</p>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-4 mb-4">
            <div className="shadow p-4 rounded text-center h-100 bg-light">
              <GiCheckMark className="fs-1 text-success" />
              <h3 className="text-success">{completedRequests}</h3>
              <p className="mb-0">Completed Requests</p>
            </div>
          </div>

        </div>

        <div className="card shadow border-0 mt-2">
          <div className="card-body p-4">

            <h4 className="mb-2 text-success">
              <GiHand /> Food Redistribution
            </h4>

            <p className="text-muted">
              Browse available surplus food and request donations for your
              organization.
            </p>

            <div className="d-flex flex-column flex-sm-row gap-2 mt-3">

              <Link
                to="/available-food"
                className="btn btn-success"
              >
                <GiMeal /> Browse Available Food
              </Link>

              <Link
                to="/my-requests"
                className="btn btn-outline-success"
              >
                <GiReceiveMoney /> My Requests
              </Link>

            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default OrganizationDashboard