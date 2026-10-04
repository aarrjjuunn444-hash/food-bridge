
import axios from 'axios'

const BASE_URL = ' https://food-server-1-3bck.onrender.com'

export const registerAPI = async (userData) => {
    return await axios.post(`${BASE_URL}/users`, userData)
}

export const loginAPI = async () => {
    return await axios.get(`${BASE_URL}/users`)
}

export const addFoodAPI = async (foodData) => {
  return await axios.post(`${BASE_URL}/foods`, foodData)
}
export const getDonorFoodsAPI = async (donorId) => {
  return await axios.get(`${BASE_URL}/foods?donorId=${donorId}`)
}
export const getAvailableFoodsAPI = async () => {
  return await axios.get(`${BASE_URL}/foods?status=available`)
}

export const requestFoodAPI = async (requestData) => {
  return await axios.post(`${BASE_URL}/requests`, requestData)
}
export const getMyRequestsAPI = async (organizationId) => {
  return await axios.get(`${BASE_URL}/requests?organizationId=${organizationId}`)
}
export const getDonorRequestsAPI = async (donorId) => {
  return await axios.get(`${BASE_URL}/requests?donorId=${donorId}`)
}

export const updateRequestAPI = async (id, statusData) => {
  return await axios.patch(`${BASE_URL}/requests/${id}`, statusData)
}

export const updateFoodAPI = async (id, foodData) => {
  return await axios.patch(`${BASE_URL}/foods/${id}`, foodData)
}
export const getAllUsersAPI = async () => {
  return await axios.get(`${BASE_URL}/users`)
}

export const getAllFoodsAPI = async () => {
  return await axios.get(`${BASE_URL}/foods`)
}

export const getAllRequestsAPI = async () => {
  return await axios.get(`${BASE_URL}/requests`)
}
export const deleteFoodAPI = async (id) => {
  return await axios.delete(`${BASE_URL}/foods/${id}`)
}
export const getFoodByIdAPI = async (id) => {
  return await axios.get(`${BASE_URL}/foods/${id}`)
}