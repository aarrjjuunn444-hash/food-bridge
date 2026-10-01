import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-dark text-light mt-5">
      <div className="container py-5">
        <div className="row">
          <div className="col-md-6 mb-4">
            <h4 className="fw-bold">🍲 FoodBridge</h4>
            <p className="text-secondary mb-0">
              Connecting surplus food with organizations to reduce
              food waste and support communities in need.
            </p>
          </div>

          <div className="col-md-3 mb-4">
            <h5>Quick Links</h5>

            <div className="d-flex flex-column gap-2 mt-3">
              <Link to="/" className="text-secondary text-decoration-none">
                Home
              </Link>

              <Link to="/about" className="text-secondary text-decoration-none">
                About
              </Link>

              <Link to="/impact" className="text-secondary text-decoration-none">
                Impact
              </Link>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <h5>FoodBridge</h5>

            <p className="text-secondary mt-3 mb-0">
              Donate surplus food.
              <br />
              Support communities.
              <br />
              Reduce food waste.
            </p>
          </div>

        </div>

        <hr className="border-secondary" />

        <div className="text-center">
          <p className="text-secondary mb-0">
            © 2026 FoodBridge. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer