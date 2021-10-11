
import { CREATE_CUSTOMER_FAIL, CREATE_CUSTOMER_SUCCESS, DELETE_ALL_CUSTOMER_FAIL, DELETE_ALL_CUSTOMER_SUCCESS, DELETE_CUSTOMER_FAIL, DELETE_CUSTOMER_SUCCESS, LIST_CUSTOMER_FAIL, LIST_CUSTOMER_SUCCESS, SEARCH_CUSTOMER_FAIL, SEARCH_CUSTOMER_SUCCESS, SHOW_CUSTOMER_FAIL, SHOW_CUSTOMER_SUCCESS, UPDATE_CUSTOMER_FAIL, UPDATE_CUSTOMER_SUCCESS } from "../../actions/customer/type"


const initialState = {
  customers: [],
  customer: null
}

const customerReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case LIST_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: payload
      }
    case LIST_CUSTOMER_FAIL:
      return {
        ...state,
      }
    case CREATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: [...state.customers, payload]
      }
    case CREATE_CUSTOMER_FAIL:
      return {
        ...state
      }
    case DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: state.customers.filter(({ id }) => id !== payload)
      }
    case DELETE_CUSTOMER_FAIL:
      return {
        ...state
      }
    case DELETE_ALL_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: []
      }
    case DELETE_ALL_CUSTOMER_FAIL:
      return {
        ...state
      }
    case UPDATE_CUSTOMER_SUCCESS:
      console.log(payload, 'edit customer paylaod', state.customers)
      return {
        ...state,
        customers: state.customers.map((customer) => {
          console.log(customer.id === payload.id, 'dddddddddddd')
          if (customer.id === payload.id) {
            return {
              ...customer,
              ...payload
            }
          } else {
            return customer
          }
        })
      }
    case UPDATE_CUSTOMER_FAIL:
      return {
        ...state
      }
    case SHOW_CUSTOMER_SUCCESS:
      return {
        ...state,
        customer: payload
      }
    case SHOW_CUSTOMER_FAIL:
      return {
        ...state
      }
    case SEARCH_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: payload
      }
    case SEARCH_CUSTOMER_FAIL:
      return {
        ...state,
      }
    default:
      return state
  }
}

export default customerReducer
