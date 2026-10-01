import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDonorRequestsAPI, updateRequestAPI, updateFoodAPI} from '../services/allAPI'
import { toast } from 'react-toastify'
import { GiBowlOfRice, GiReceiveMoney, GiCheckMark, GiHand } from "react-icons/gi"

function DonorRequests() {
  const [requests, setRequests] = useState([])

  const user = JSON.parse(localStorage.getItem('foodBridgeUser'))
  const navigate = useNavigate()

  const getRequests = async () => {
    try {
      const response = await getDonorRequestsAPI(user.id)
      setRequests(response.data)
    } catch (error) {
      console.log(error)
      toast.error('Failed to load requests')
    }
  }

  useEffect(() => {
    getRequests()
  }, [])

  const handleStatus = async (request, status) => {
    try {
      if (status === 'accepted') {
        await updateFoodAPI(request.foodId, {
          status: 'completed'
        })
      }

      await updateRequestAPI(request.id, {
        status: status
      })

      toast.success(`Request ${status}`)
      getRequests()
    } catch (error) {
      console.log(error)
      toast.error('Failed to update request')
    }
  }

  return (
    <div className="container-fluid py-4 py-md-5" style={{background:'linear-gradient(135deg, #b8bdba, #3ca6ca, #2d2f2f)', minHeight:'90vh'}}>
      <div className="container">

        <button
          className="btn btn-outline-light mb-3"
          onClick={() => navigate('/donor-dashboard')}
        >
          ← Back to Dashboard
        </button>

        <div className="mb-4 text-light">
          <h2><GiReceiveMoney /> Food Requests</h2>
          <p className="mb-0">
            Manage requests received from organizations.
          </p>
        </div>

        {requests.length === 0 ? (
          <div className="alert alert-info">
            No food requests received yet.
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

                    <h5 className="card-title">
                      <GiBowlOfRice className="text-success me-2" />
                      {request.foodName}
                    </h5>

                    <hr />

                    <p className="mb-2">
                      <strong>Organization:</strong>{' '}
                      {request.organizationName}
                    </p>

                    <p className="mb-3">
                      <strong>Status:</strong>{' '}

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
                    </p>

                    {request.status === 'pending' && (
                      <div className="mt-auto d-flex flex-wrap gap-2">

                        <button
                          className="btn btn-success"
                          onClick={() =>
                            handleStatus(request, 'accepted')
                          }
                        >
                          <GiCheckMark /> Accept
                        </button>

                        <button
                          className="btn btn-danger"
                          onClick={() =>
                            handleStatus(request, 'rejected')
                          }
                        >
                          <GiHand /> Reject
                        </button>

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

export default DonorRequests