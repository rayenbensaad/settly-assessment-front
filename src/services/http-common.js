import axios from "axios"

const access_token = null || JSON.parse(localStorage.getItem('access_token'))
const BASE_URL = process.env.REACT_APP_BASE_URL

//console.log(access_token)
export default axios.create({
  
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer${access_token}`
  },
  withCredentials: true
})
