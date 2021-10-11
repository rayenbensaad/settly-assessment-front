import http from "./http-common"

const login = (email, password) => {
  return http
    .post("api/login", {
      email,
      password
    })
    .then((response) => {
      console.log(response)
      if (response.data) {
        localStorage.setItem("userData", JSON.stringify(response.data))
        localStorage.setItem("access_token", JSON.stringify(response.data.token))
      }

      return response.data
    })
}


const register = (data) => {
  console.log(data)
  return http
    .post("api/register", data)
    .then((response) => {
      return response.data
    })
}

const logout = (token) => {
  return http
    .get("api/logout", { params: { token }})
    .then((response) => {
      return response.data
    })
}

const verifyAccount = (verification_code) => {
  console.log(verification_code)
  return http
    .get(`api/verify/${verification_code}`)
    .then((response) => {
  console.log(response)

      return response.data
    })
}

export default {
  login,
  register,
  verifyAccount,
  logout
}
