import React from 'react'
import { Link } from 'react-router-dom'
import { GiBowlOfRice, GiMeal, GiReceiveMoney, GiHand } from "react-icons/gi"

function Home() {
  return (
    <>
      <div className="d-flex align-items-center"style={{ minHeight: '90vh', background:'linear-gradient(135deg, #e34e50, #184aff)' }}>
        <div className="container text-center text-light">
          <h1 className="display-3 fw-bold">
            <GiBowlOfRice />
            FoodBridge
          </h1>
          <p className="lead mt-4">Connecting surplus food with organizations to reduce food waste and support communities in need.</p>
          <div className="mt-4">
          <Link to="/available-food" className="btn btn-success me-3">Explore Food</Link>
          <Link to="/impact" className="btn btn-outline-light">View Impact</Link>
          </div>
        </div>
      </div>
      <div className="container my-5">
        <div className="text-center mb-5">
          <h2>How FoodBridge Works</h2>
          <p className="text-muted">A simple process to reduce food waste.</p>
        </div>

        <div className="row">

          <div className="col-md-4 mb-4">
            <div className="shadow p-4 rounded text-center h-100">
              <GiMeal className="fs-1 text-success mb-3" />
              <h4>Donors Add Food</h4>
              <p>Restaurants, events, and individuals can donate surplus food.</p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="shadow p-4 rounded text-center h-100">
              <GiReceiveMoney className="fs-1 text-success mb-3" />
              <h4>Organizations Request</h4>
              <p>NGOs and charities browse and request available food.</p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="shadow p-4 rounded text-center h-100">
              <GiHand className="fs-1 text-success mb-3" />
              <h4>Food Reaches People</h4>
              <p>Food is redistributed instead of being wasted.</p>
            </div>
          </div>

        </div>
      </div>
      <div className="bg-light py-5">
        <div className="container text-center">
          <h2>Our Mission</h2>
          <p className="mt-3 text-muted">FoodBridge aims to minimize food waste by creating a digital platform that connects food donors with organizations in need, ensuring surplus food reaches the right people at the right time.</p>
        </div>
      </div>
    </>
  )
}

export default Home