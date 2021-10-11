// ** UseJWT import to get config
import { CREATE_CUSTOMER_FAIL, CREATE_CUSTOMER_SUCCESS, DELETE_ALL_CUSTOMER_FAIL, DELETE_ALL_CUSTOMER_SUCCESS, DELETE_CUSTOMER_FAIL, DELETE_CUSTOMER_SUCCESS, LIST_CUSTOMER_FAIL, LIST_CUSTOMER_SUCCESS, SEARCH_CUSTOMER_FAIL, SEARCH_CUSTOMER_SUCCESS, SHOW_CUSTOMER_FAIL, SHOW_CUSTOMER_SUCCESS, UPDATE_CUSTOMER_FAIL, UPDATE_CUSTOMER_SUCCESS } from "./type"
import CustomerService from "../../../services/customer"
import { SET_MESSAGE } from "../auth/type";

export const listCustomers = () => (dispatch) => {
  return CustomerService.list().then(
    (response) => {
      console.log(response, 'ree');
      dispatch({
        type: LIST_CUSTOMER_SUCCESS,
        payload: response.customers
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
        type: LIST_CUSTOMER_FAIL
      })

      dispatch({
        type: SET_MESSAGE,
        payload: message
      })

      return Promise.reject()
    }
  )
}


export const createCustomer = (data) => (dispatch) => {
  return CustomerService.create(data).then(
    (data) => {
      console.log(data)
      dispatch({
        type: CREATE_CUSTOMER_SUCCESS,
        payload: data
      })
      dispatch({
        type: SET_MESSAGE,
        payload:data.message || data?.error.email[0]
      })

      return Promise.resolve()
    },
    (error) => {
      const message =
        (error.error.email &&
          error.error.name &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      console.log(error)
      dispatch({
        type: CREATE_CUSTOMER_FAIL
      })

      dispatch({
        type: SET_MESSAGE,
        payload: message
      })

      return Promise.reject()
    }
  )
}

export const showCustomers = (id) => (dispatch) => {
  return CustomerService.show(id).then(
    (response) => {
      console.log(response, 'show');
      dispatch({
        type: SHOW_CUSTOMER_SUCCESS,
        payload: response.customer
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
        type: SHOW_CUSTOMER_FAIL
      })

      dispatch({
        type: SET_MESSAGE,
        payload: message
      })

      return Promise.reject()
    }
  )
}


export const deleteCustomer = (id) => (dispatch) => {
  return CustomerService.deleteCustomer(id).then(
    (response) => {
      console.log(response, 'delete');
      dispatch({
        type: DELETE_CUSTOMER_SUCCESS,
        payload: id
      })

      dispatch({
        type: SET_MESSAGE,
        payload: response.data
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
        type: DELETE_CUSTOMER_FAIL
      })

      dispatch({
        type: SET_MESSAGE,
        payload: message
      })

      return Promise.reject()
    }
  )
}


export const editCustomer = (id, data) => (dispatch) => {
  return CustomerService.update(id, data).then(
    (response) => {
      console.log(response, 'edit');
      dispatch({
        type: UPDATE_CUSTOMER_SUCCESS,
        payload: response.customer
      })

      dispatch({
        type: SET_MESSAGE,
        payload: response.data
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
        type: UPDATE_CUSTOMER_FAIL
      })

      dispatch({
        type: SET_MESSAGE,
        payload: message
      })

      return Promise.reject()
    }
  )
}


export const removeAllCustomer = () => (dispatch) => {
  return CustomerService.removeAll().then(
    (response) => {
      console.log(response, 'removeAll');
      dispatch({
        type: DELETE_ALL_CUSTOMER_SUCCESS,
        payload: response.customer
      })

      dispatch({
        type: SET_MESSAGE,
        payload: response.data
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
        type: DELETE_ALL_CUSTOMER_FAIL
      })

      dispatch({
        type: SET_MESSAGE,
        payload: message
      })

      return Promise.reject()
    }
  )
}


export const search = (keyWord) => (dispatch) => {
  return CustomerService.search(keyWord).then(
    (response) => {
      console.log(response, 'keyWord', keyWord);
      dispatch({
        type: SEARCH_CUSTOMER_SUCCESS,
        payload: response.customer
      })

      dispatch({
        type: SET_MESSAGE,
        payload: response.data
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
        type: SEARCH_CUSTOMER_FAIL
      })

      dispatch({
        type: SET_MESSAGE,
        payload: message
      })

      return Promise.reject()
    }
  )
}