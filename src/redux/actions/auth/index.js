// ** UseJWT import to get config
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  VERIF_ACCOUNT_SUCCESS,
  VERIF_ACCOUNT_FAIL
} from "./type"
import AuthService from "../../../services/auth"

export const registerUser = (data) => (dispatch) => {
  console.log('dataa', data);
  return AuthService.register(data).then(
    (response) => {
      console.log(response);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data
      })

      dispatch({
        type: SET_MESSAGE,
        payload: response.message
      })

      return Promise.resolve()
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      dispatch({
        type: REGISTER_FAIL
      })

      dispatch({
        type: SET_MESSAGE,
        payload: message
      })

      return Promise.reject()
    }
  )
}


export const login = (email, password) => (dispatch) => {
  console.log(email, password)
  return AuthService.login(email, password).then(
    (data) => {
      console.log(data)
      localStorage.setItem("userData", JSON.stringify(data))

      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data }
      })
      dispatch({
        type: SET_MESSAGE,
        payload: ''
      })

      return Promise.resolve()
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      console.log(message)
      console.log(error)
      dispatch({
        type: LOGIN_FAIL
      })

      dispatch({
        type: SET_MESSAGE,
        payload: message
      })

      return Promise.reject()
    }
  )
}



export const logout = (token) => (dispatch) => {
  console.log(token)
  return AuthService.logout(token).then(
    (data) => {
      console.log(data)
      dispatch({
        type: LOGOUT,
        payload: { user: null }
      })
      dispatch({
        type: SET_MESSAGE,
        payload: data.message
      })

      return Promise.resolve()
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      console.log(message)
      dispatch({
        type: LOGIN_FAIL
      })

      dispatch({
        type: SET_MESSAGE,
        payload: message
      })

      return Promise.reject()
    }
  )
}



export const verifAccount = (data) => (dispatch) => {
  console.log(data)
  return AuthService.verifyAccount(data).then(
    (response) => {
      console.log(response)
      dispatch({
        type: VERIF_ACCOUNT_SUCCESS
      })

      dispatch({
        type: SET_MESSAGE,
        payload: response.error || response.message
      })
      return Promise.resolve()
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      dispatch({
        type: VERIF_ACCOUNT_FAIL
      })

      dispatch({
        type: SET_MESSAGE,
        payload: message
      })

      return Promise.reject()
    }
  )
}
