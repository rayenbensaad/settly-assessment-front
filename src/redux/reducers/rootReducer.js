// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import customer from './customer'
import message from "./auth/message"


const rootReducer = combineReducers({
  auth,
  customer,
  message

})

export default rootReducer
