import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getDonorFoodsAPI, deleteFoodAPI } from '../services/allAPI'
import { toast } from 'react-toastify'
import { GiBowlOfRice, GiMeal, GiReceiveMoney, GiCheckMark } from "react-icons/gi"

function DonorDashboard() {
  const [foods, setFoods] = useState([])

  const user = JSON.parse(localStorage.getItem('foodBridgeUser'))

  const getFoods = async () => {
    try {
      const response = await getDonorFoodsAPI(user.id)
      setFoods(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this food?'
    )

    if (!confirmDelete) {
      return
    }

    try {
      await deleteFoodAPI(id)
      toast.success('Food deleted successfully')
      getFoods()
    } catch (error) {
      console.log(error)
      toast.error('Failed to delete food')
    }
  }

  useEffect(() => {
    getFoods()
  }, [])

  const totalDonations = foods.length
  const availableFood = foods.filter(
    item => item.status === 'available'
  ).length
  const completedDonations = foods.filter(
    item => item.status === 'completed'
  ).length

  return (
    <div className="container-fluid py-4 py-md-5" style={{background:'linear-gradient( #64f4e8, #7d1bfc, #64f4e8)', minHeight:'90vh'}}>
      <div className="container">

        <div className="row align-items-center mb-4 text-light">
          <div className="col-lg-6 mb-3 mb-lg-0">
            <h2><GiBowlOfRice /> Donor Dashboard</h2>
            <p className="mb-0">
              Welcome, {user?.name}
            </p>
          </div>

          <div className="col-lg-6">
            <div className="d-flex flex-column flex-sm-row justify-content-lg-end gap-2">
              <Link
                to="/add-food"
                className="btn btn-light text-success"
              >
                <GiMeal /> Add Food Donation
              </Link>

              <Link
                to="/donor-requests"
                className="btn btn-outline-light"
              >
                <GiReceiveMoney /> Food Requests
              </Link>
            </div>
          </div>
        </div>

        <div className="row">

          <div className="col-sm-6 col-lg-4 mb-3">
            <div className="shadow p-4 rounded text-center h-100 bg-light">
              <GiBowlOfRice className="fs-1 text-success" />
              <h4>{totalDonations}</h4>
              <p className="mb-0">Total Donations</p>
            </div>
          </div>

          <div className="col-sm-6 col-lg-4 mb-3">
            <div className="shadow p-4 rounded text-center h-100 bg-light">
              <GiMeal className="fs-1 text-success" />
              <h4>{availableFood}</h4>
              <p className="mb-0">Available Food</p>
            </div>
          </div>

          <div className="col-sm-6 col-lg-4 mb-3">
            <div className="shadow p-4 rounded text-center h-100 bg-light">
              <GiCheckMark className="fs-1 text-success" />
              <h4>{completedDonations}</h4>
              <p className="mb-0">Completed Donations</p>
            </div>
          </div>

        </div>

        <div className="mt-5">
          <h3 className="text-light">My Food Donations</h3>

          {foods.length === 0 ? (
            <div className="alert alert-info mt-3">
              No food donations added yet.
            </div>
          ) : (
            <div className="row mt-3">

              {foods.map((food) => (

                <div
                  className="col-12 col-md-6 col-lg-4 mb-4"
                  key={food.id}
                >

                  <div className="card shadow h-100 border-0">

                    <div className="card-body d-flex flex-column">

                      <h5 className="card-title">
                        <GiMeal className="text-success me-2" />
                        {food.foodName}
                      </h5>

                      <p className="mb-1">
                        <strong>Category:</strong> {food.category}
                      </p>

                      <p className="mb-1">
                        <strong>Quantity:</strong> {food.quantity}
                      </p>

                      <p className="mb-1">
                        <strong>Location:</strong> {food.location}
                      </p>

                      <p className="mb-2">
                        <strong>Status:</strong>{' '}
                        <span
                          className={`badge ${
                            food.status === 'available'
                              ? 'bg-success'
                              : 'bg-secondary'
                          }`}
                        >
                          {food.status}
                        </span>
                      </p>

                      <p className="text-muted small">
                        Available until: {food.availableTime}
                      </p>

                      <div className="mt-auto d-flex flex-wrap gap-2">

                        <Link
                          to={`/edit-food/${food.id}`}
                          className="btn btn-warning"
                        >
                          Edit
                        </Link>

                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(food.id)}
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>
          )}

        </div>

      </div>
    </div>
  )
}

export default DonorDashboard