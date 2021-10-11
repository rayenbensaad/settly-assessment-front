import http from "./http-common"
const token = null || JSON.parse(localStorage.getItem('access_token'))

const list = () => {
  return http
    .get("api/customer/list",{ params: { token }})
    .then((response) => {
      console.log(response)
      return response.data
    })
}


const create = (data) => {
  console.log(data)
  return http
    .post("api/customer/create", data, { params: { token }})
    .then((response) => {
      return response.data
    })
}

const show = (id) => {
  return http
    .get(`api/customer/show/${id}`, { params: { token }})
    .then((response) => {
      return response.data
    })
}

const update = (id, data) => {
  console.log(data);
  return http
    .post(`api/customer/update/${id}`, data, { params: { token }})
    .then((response) => {
      return response.data
    })
}

const removeAll = () => {
  return http
    .delete("api/customer/removeAll", { params: { token }})
    .then((response) => {
      console.log(response)
      return response
    })
    
}

const deleteCustomer = (id) => {
  return http
    .delete(`api/customer/delete/${id}`,{ params: { token }})
    .then((response) => {
      console.log(response)
      return response
    })
    
}

const search = (keyWord) => {
  console.log(keyWord);
  return http
    .post("api/customer/search", {keyWord}, { params: { token }} )
    .then((response) => {
      console.log(response);
      return response.data
    })
}

export default {
  list,
  create,
  show,
  update,
  removeAll,
  deleteCustomer,
  search
}
