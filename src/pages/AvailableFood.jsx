import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { requestFoodAPI, getAvailableFoodsAPI } from '../services/allAPI'
import { toast } from 'react-toastify'
import { GiBowlOfRice, GiMeal } from "react-icons/gi"

function AvailableFood() {
  const [foods, setFoods] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const navigate = useNavigate()

  const getFoods = async () => {
    try {
      const response = await getAvailableFoodsAPI()
      setFoods(response.data)
    } catch (error) {
      console.log(error)
      toast.error('Failed to load available food')
    }
  }

  useEffect(() => {
    getFoods()
  }, [])

  const handleRequest = async (food) => {
    const user = JSON.parse(localStorage.getItem('foodBridgeUser'))

    try {
      const response = await requestFoodAPI({
        foodId: food.id,
        foodName: food.foodName,
        organizationId: user.id,
        organizationName: user.name,
        donorId: food.donorId,
        status: 'pending'
      })

      if (response.status === 201) {
        toast.success('Food request submitted successfully!')
      }
    } catch (error) {
      console.log(error)
      toast.error('Failed to submit request')
    }
  }

  const filteredFoods = foods.filter((food) => {
    const matchSearch = food.foodName
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchCategory =
      category === '' || food.category === category

    return matchSearch && matchCategory
  })

  return (
    <div className="container-fluid py-4 py-md-5" style={{background:'linear-gradient(135deg, #39cdde, #dfc831, #67cf5f)', minHeight:'90vh'}}>
      <div className="container">
        <button
          className="btn btn-outline-light mb-3"
          onClick={() => navigate('/organization-dashboard')}
        >
          ← Back to Dashboard
        </button>

        <div className="mb-4 text-light">
          <h2><GiBowlOfRice /> Available Food</h2>
          <p className="mb-0">
            Browse surplus food available for redistribution.
          </p>
        </div>

        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-12 col-md-7 mb-3 mb-md-0">
                <label className="form-label fw-semibold">
                  Search Food
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by food name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="col-12 col-md-5">
                <label className="form-label fw-semibold">
                  Category
                </label>
                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  <option value="Cooked Food">Cooked Food</option>
                  <option value="Bakery">Bakery</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Vegetables">Vegetables</option>
                  <option value="Packaged Food">Packaged Food</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3 text-light">
          <h4 className="mb-0">Food Listings</h4>
          <span className="badge bg-light text-success">
            {filteredFoods.length} Available
          </span>
        </div>

        <div className="row">
          {filteredFoods.length === 0 ? (
            <div className="col-12">
              <div className="alert alert-info">
                No available food found.
              </div>
            </div>
          ) : (
            filteredFoods.map((food) => (
              <div
                className="col-12 col-md-6 col-lg-4 mb-4"
                key={food.id}
              >
                <div className="card shadow h-100 border-0">
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="card-title mb-0">
                        <GiMeal className="text-success me-2" />
                        {food.foodName}
                      </h5>
                      <span className="badge bg-success">
                        Available
                      </span>
                    </div>

                    <hr />

                    <p className="mb-2">
                      <strong>Category:</strong> {food.category}
                    </p>

                    <p className="mb-2">
                      <strong>Quantity:</strong> {food.quantity}
                    </p>

                    <p className="mb-2">
                      <strong>Location:</strong> {food.location}
                    </p>

                    <p className="mb-2">
                      <strong>Donor:</strong> {food.donorName}
                    </p>

                    {food.description && (
                      <p className="text-muted small mb-2">
                        {food.description}
                      </p>
                    )}

                    <p className="text-muted small mb-3">
                      Available until: {food.availableTime}
                    </p>

                    <button
                      className="btn btn-success w-100 mt-auto"
                      onClick={() => handleRequest(food)}
                    >
                      Request Food
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default AvailableFood