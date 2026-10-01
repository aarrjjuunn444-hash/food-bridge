import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getFoodByIdAPI, updateFoodAPI } from '../services/allAPI'
import { toast } from 'react-toastify'
import { GiBowlOfRice, GiMeal } from "react-icons/gi"

function EditFood() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [foodData, setFoodData] = useState({
    foodName: '',
    category: '',
    quantity: '',
    location: '',
    availableTime: '',
    description: ''
  })

  const getFood = async () => {
    try {
      const response = await getFoodByIdAPI(id)
      setFoodData(response.data)
    } catch (error) {
      console.log(error)
      toast.error('Failed to load food details')
    }
  }

  useEffect(() => {
    getFood()
  }, [id])

  const handleChange = (e) => {
    setFoodData({
      ...foodData,
      [e.target.name]: e.target.value
    })
  }

  const handleUpdate = async (e) => {
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

    try {
      await updateFoodAPI(id, foodData)
      toast.success('Food updated successfully')
      navigate('/donor-dashboard')
    } catch (error) {
      console.log(error)
      toast.error('Failed to update food')
    }
  }

  return (
    <div className="container-fluid py-4 py-md-5" style={{background:'linear-gradient( #070f0b, #0f766e)', minHeight:'90vh'}}>
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
                <GiBowlOfRice /> Edit Food Donation
              </h2>

              <p className="text-center text-muted mb-4">
                Update your food donation details.
              </p>

              <form onSubmit={handleUpdate}>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Food Name
                  </label>
                  <input
                    type="text"
                    name="foodName"
                    value={foodData.foodName}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Example: Vegetable Rice"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Category
                  </label>
                  <select
                    name="category"
                    value={foodData.category}
                    onChange={handleChange}
                    className="form-select"
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
                  <label className="form-label fw-semibold">
                    Quantity
                  </label>
                  <input
                    type="text"
                    name="quantity"
                    value={foodData.quantity}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Example: 20 meals"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={foodData.location}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter food pickup location"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Available Until
                  </label>
                  <input
                    type="datetime-local"
                    name="availableTime"
                    value={foodData.availableTime}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={foodData.description}
                    onChange={handleChange}
                    className="form-control"
                    rows="3"
                    placeholder="Enter additional information about the food"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100"
                >
                  <GiMeal /> Update Food
                </button>

              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default EditFood