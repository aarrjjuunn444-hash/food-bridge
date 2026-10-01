import React from 'react'
import { GiBowlOfRice, GiMeal, GiReceiveMoney, GiHand } from "react-icons/gi"

function About() {
  return (
    <>
      <div className="p-5" style={{background:'linear-gradient( #bbbd2c, #1ab808)'}}>
        <div className="container my-5">
          <div className="text-center text-light">
            <h1><GiBowlOfRice /> About FoodBridge</h1>
            <p className="lead mt-3">
              FoodBridge is a platform that helps connect surplus food donors
              with organizations that can make use of available food.
            </p>
          </div>

          <div className="row mt-5">

            <div className="col-md-4 mb-3">
              <div className="shadow p-4 rounded h-100 text-center bg-light">
                <GiMeal className="fs-1 text-success mb-3" />
                <h4>Donate Food</h4>
                <p>
                  Donors can list surplus food with details such as quantity,
                  category, location and availability time.
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="shadow p-4 rounded h-100 text-center bg-light">
                <GiReceiveMoney className="fs-1 text-success mb-3" />
                <h4>Find Food</h4>
                <p>
                  Organizations can browse, search and filter available food
                  listings and submit requests.
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="shadow p-4 rounded h-100 text-center bg-light">
                <GiHand className="fs-1 text-success mb-3" />
                <h4>Track Impact</h4>
                <p>
                  The platform keeps track of donations, requests and completed
                  food distributions.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default About