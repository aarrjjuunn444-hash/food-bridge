import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllFoodsAPI, getAllRequestsAPI } from '../services/allAPI'
import { toast } from 'react-toastify'
import { GiBowlOfRice, GiHand, GiCheckMark, GiReceiveMoney, GiMeal } from "react-icons/gi"

function Impact() {
  const [foods, setFoods] = useState([])
  const [requests, setRequests] = useState([])

  const navigate = useNavigate()

  const getData = async () => {
    try {
      const foodResponse = await getAllFoodsAPI()
      const requestResponse = await getAllRequestsAPI()

      setFoods(foodResponse.data)
      setRequests(requestResponse.data)
    } catch (error) {
      console.log(error)
      toast.error('Failed to load impact data')
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const completedFoods = foods.filter(
    item => item.status === 'completed'
  )

  const acceptedRequests = requests.filter(
    item => item.status === 'accepted'
  )

  const mealsRedistributed = completedFoods.reduce((total, food) => {
    const quantity = parseInt(food.quantity) || 0
    return total + quantity
  }, 0)

  const activeDonors = [
    ...new Set(
      foods
        .filter(item => item.donorId)
        .map(item => item.donorId)
    )
  ].length

  const availableFood = foods.filter(
    item => item.status === 'available'
  ).length

  return (
    <div className="container-fluid py-4 py-md-5" style={{background:'linear-gradient(135deg, #0c3817, #198754, #7daaa6)', minHeight:'90vh'}}>
      <div className="container">

        <button
          className="btn btn-outline-light mb-4"
          onClick={() => navigate('/')}
        >
          ← Back to Home
        </button>

        <div className="text-center mb-5 text-light">
          <h2 className="fw-bold">
            <GiBowlOfRice /> FoodBridge Impact
          </h2>
          <p className="mb-0">
            See how FoodBridge is helping reduce food waste and
            connect surplus food with organizations.
          </p>
        </div>

        <div className="row">

          <div className="col-12 col-sm-6 col-lg-4 mb-4">
            <div className="card shadow border-0 h-100 text-center">
              <div className="card-body p-4">
                <GiMeal className="display-5 text-success mb-2" />
                <h2 className="text-success fw-bold">
                  {mealsRedistributed}
                </h2>
                <h5>Meals Redistributed</h5>
                <p className="text-muted mb-0">
                  Estimated meals successfully redistributed
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-4 mb-4">
            <div className="card shadow border-0 h-100 text-center">
              <div className="card-body p-4">
                <GiHand className="display-5 text-success mb-2" />
                <h2 className="text-success fw-bold">
                  {completedFoods.length}
                </h2>
                <h5>Completed Donations</h5>
                <p className="text-muted mb-0">
                  Donations successfully distributed
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-4 mb-4">
            <div className="card shadow border-0 h-100 text-center">
              <div className="card-body p-4">
                <GiCheckMark className="display-5 text-success mb-2" />
                <h2 className="text-success fw-bold">
                  {acceptedRequests.length}
                </h2>
                <h5>Successful Requests</h5>
                <p className="text-muted mb-0">
                  Requests accepted by donors
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 mb-4">
            <div className="card shadow border-0 h-100 text-center">
              <div className="card-body p-4">
                <GiReceiveMoney className="display-5 text-success mb-2" />
                <h2 className="text-success fw-bold">
                  {activeDonors}
                </h2>
                <h5>Active Donors</h5>
                <p className="text-muted mb-0">
                  Users who have listed surplus food
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 mb-4">
            <div className="card shadow border-0 h-100 text-center">
              <div className="card-body p-4">
                <GiMeal className="display-5 text-success mb-2" />
                <h2 className="text-success fw-bold">
                  {availableFood}
                </h2>
                <h5>Food Currently Available</h5>
                <p className="text-muted mb-0">
                  Donations currently available for organizations
                </p>
              </div>
            </div>
          </div>

        </div>

        <div className="card shadow border-0 mt-4">
          <div className="card-body text-center p-4 p-md-5">

            <h3 className="fw-bold text-success">
              <GiHand /> Our Mission
            </h3>

            <p className="text-muted mt-3 mb-0">
              FoodBridge helps reduce food waste by connecting surplus
              food donors with organizations that can redistribute it
              to people in need. Every successful donation represents
              food saved from waste and redirected toward the community.
            </p>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Impact