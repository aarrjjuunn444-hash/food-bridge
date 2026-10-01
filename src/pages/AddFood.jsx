import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addFoodAPI } from '../services/allAPI'
import { toast } from 'react-toastify'
import { GiBowlOfRice, GiMeal } from "react-icons/gi"

function AddFood() {
  const navigate = useNavigate()

  const [foodData, setFoodData] = useState({
    foodName: '',
    category: '',
    quantity: '',
    location: '',
    availableTime: '',
    description: ''
  })

  const handleAddFood = async (e) => {
    e.preventDefault()

    if (
      !foodData.foodName ||
      !foodData.category ||
      !foodData.quantity ||
      !foodData.location ||
      !foodData.availableTime
    ) {
      toast.error('Please fill all required fields')
      return
    }

    const user = JSON.parse(localStorage.getItem('foodBridgeUser'))

    try {
      const response = await addFoodAPI({
        ...foodData,
        donorId: user.id,
        donorName: user.name,
        status: 'available'
      })

      if (response.status === 201) {
        toast.success('Food donation added successfully')
        navigate('/donor-dashboard')
      }
    } catch (error) {
      console.log(error)
      toast.error('Failed to add food donation')
    }
  }

  return (
    <div className="container-fluid py-4 py-md-5" style={{background:'linear-gradient(135deg, #8fe6c0, #e3aa60, #a9b4b3)', minHeight:'90vh'}}>
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-7">
          <button
            className="btn btn-outline-light mb-3"
            onClick={() => navigate('/donor-dashboard')}
          >
            ← Back to Dashboard
          </button>
          <div className="card shadow border-0">
            <div className="card-body p-3 p-md-4">
              <h2 className="text-center mb-2 text-success">
                <GiBowlOfRice /> Add Food Donation
              </h2>
              <p className="text-center text-muted mb-4">
                Share surplus food with organizations in need.
              </p>
              <form onSubmit={handleAddFood}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Food Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Example: Vegetable Rice"
                    value={foodData.foodName}
                    onChange={(e) =>
                      setFoodData({
                        ...foodData,
                        foodName: e.target.value
                      })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Category</label>
                  <select
                    className="form-select"
                    value={foodData.category}
                    onChange={(e) =>
                      setFoodData({
                        ...foodData,
                        category: e.target.value
                      })
                    }
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Cooked Food">Cooked Food</option>
                    <option value="Bakery">Bakery</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Packaged Food">Packaged Food</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Quantity</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Example: 20 meals"
                    value={foodData.quantity}
                    onChange={(e) =>
                      setFoodData({
                        ...foodData,
                        quantity: e.target.value
                      })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter food pickup location"
                    value={foodData.location}
                    onChange={(e) =>
                      setFoodData({
                        ...foodData,
                        location: e.target.value
                      })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Available Until</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={foodData.availableTime}
                    onChange={(e) =>
                      setFoodData({
                        ...foodData,
                        availableTime: e.target.value
                      })
                    }
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-semibold">Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Enter additional information about the food"
                    value={foodData.description}
                    onChange={(e) =>
                      setFoodData({
                        ...foodData,
                        description: e.target.value
                      })
                    }
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn btn-success w-100"
                >
                  <GiMeal /> Add Donation
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddFood