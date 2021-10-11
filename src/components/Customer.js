import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { showCustomers, editCustomer, deleteCustomer } from '../redux/actions/customer'
import { Media, Button, Label, Input } from 'reactstrap'

const Customer = props => {
  const BASE_URL = process.env.REACT_APP_BASE_URL

  const { customer } = useSelector((state) => state.customer);
  const dispatch = useDispatch()

  const [message, setMessage] = useState("");
  const [name, setUsername] = useState(customer?.name);
  const [email, setEmail] = useState(customer?.email);
  const [profilePict, setProfilePict] = useState(customer?.profile_pict);

  useEffect(() => {
    dispatch(showCustomers(props.match.params.id))
  }, [props.match.params.id]);

  useEffect(() => {
    setUsername(customer?.name)
    setEmail(customer?.email)
    setProfilePict(customer?.profile_pict)
  }, [customer]);

  const onChangeUsername = (e) => {
    const name = e.target.value;
    setUsername(name);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);

  };

  const onChangePicture = e => {
    const reader = new FileReader(),
      files = e.target.files

    console.log(files[0])
    const data = new FormData()
    data.append('image', files[0])
    console.log(data)

    dispatch(editCustomer(customer.id, data))
    dispatch(showCustomers(customer.id))

  }

  const updateCustomer = () => {
    const data = {
      name: name || customer?.name,
      email: email || customer?.email,
    }
    console.log(customer.id, data);
    dispatch(editCustomer(customer.id, data))
    dispatch(showCustomers(customer.id))
    props.history.push("/customers");

  };

  const deleteCustomer = () => {
    dispatch(deleteCustomer(customer.id))
    props.history.push("/customers");

  };

  return (
    <div>
      {customer ? (
        <div className="edit-form">
          <h4>Customer</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                onChange={onChangeUsername}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={onChangeEmail}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Picture:</strong>
              </label>
              <Media className='mr-25' left>
                <Media object className='rounded mr-50' src={`${BASE_URL}images/${profilePict}`} alt='Generic placeholder image' height='80' width='80' />
              </Media>

            </div>
            <Button tag={Label} className='mr-75' size='sm' color='primary'>
            Upload
            <Input type='file' onChange={onChangePicture} hidden accept='image/*' />
          </Button>
          </form>


          <button className="badge badge-danger mr-2" onClick={deleteCustomer}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateCustomer}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Customer...</p>
        </div>
      )}

    </div>
  );
};

export default Customer;