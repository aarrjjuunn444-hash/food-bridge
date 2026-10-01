import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMyRequestsAPI } from '../services/allAPI'
import { toast } from 'react-toastify'
import { GiBowlOfRice, GiReceiveMoney, GiCheckMark } from "react-icons/gi"

function MyRequests() {
  const [requests, setRequests] = useState([])

  const user = JSON.parse(localStorage.getItem('foodBridgeUser'))
  const navigate = useNavigate()

  const getRequests = async () => {
    try {
      const response = await getMyRequestsAPI(user.id)
      setRequests(response.data)
    } catch (error) {
      console.log(error)
      toast.error('Failed to load your requests')
    }
  }

  useEffect(() => {
    getRequests()
  }, [])

  return (
    <div className="container-fluid py-4 py-md-5" style={{background:'linear-gradient(135deg, #d4d6db, #466f7f, #191d1d)', minHeight:'90vh'}}>
      <div className="container">

        <button
          className="btn btn-outline-light mb-3"
          onClick={() => navigate('/organization-dashboard')}
        >
          ← Back to Dashboard
        </button>

        <div className="mb-4 text-light">
          <h2><GiReceiveMoney /> My Food Requests</h2>
          <p className="mb-0">
            Track the food requests submitted by your organization.
          </p>
        </div>

        {requests.length === 0 ? (
          <div className="alert alert-info">
            You have not submitted any food requests yet.
          </div>
        ) : (
          <div className="row">

            {requests.map((request) => (

              <div
                className="col-12 col-md-6 col-lg-4 mb-4"
                key={request.id}
              >

                <div className="card shadow h-100 border-0">

                  <div className="card-body d-flex flex-column">

                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h5 className="card-title mb-0">
                        <GiBowlOfRice className="text-success me-2" />
                        {request.foodName}
                      </h5>

                      <span
                        className={`badge ${
                          request.status === 'pending'
                            ? 'bg-warning text-dark'
                            : request.status === 'accepted'
                            ? 'bg-success'
                            : 'bg-danger'
                        }`}
                      >
                        {request.status}
                      </span>
                    </div>

                    <hr />

                    <p className="mb-2">
                      <strong>Organization:</strong>{' '}
                      {request.organizationName}
                    </p>

                    <p className="mb-0 text-muted small">
                      <strong>Request ID:</strong> {request.id}
                    </p>

                    {request.status === 'accepted' && (
                      <div className="mt-auto pt-3 text-success fw-semibold">
                        <GiCheckMark /> Request accepted by donor
                      </div>
                    )}

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>
    </div>
  )
}

export default MyRequests