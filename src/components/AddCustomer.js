import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { createCustomer } from '../redux/actions/customer'
import { Button, Label, Input } from 'reactstrap'
import { Redirect } from 'react-router-dom';

const AddCustomer = () => {
    const dispatch = useDispatch();

    
    const initialCustomerState = {
        id: null,
        name: "",
        email: "",
        picture: false
    };
    const [customer, setCustomer] = useState(initialCustomerState);
    const [picture, setPicture] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const { message } = useSelector(state => state.message);
    const { user: currentUser } = useSelector((state) => state.auth);


    useEffect(() => {
        if (!currentUser) {
          return <Redirect to="/login" />;
        }    
    
      }, []);

      
    const validateEmail = (emailAdress) => {
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return !!emailAdress.match(regexEmail);
    };

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCustomer({ ...customer, [name]: value });
    };


  const onChangePicture = e => {
    const reader = new FileReader(),
      files = e.target.files

    console.log(files[0])
    const data = new FormData()
    data.append('image', files[0])
    data.append('name', customer.name)
    data.append('email', customer.email)
    console.log(data)
    setPicture(data)

  }

    const saveCustomer = () => {

        console.log(picture);
        dispatch(createCustomer(picture))
        setCustomer(initialCustomerState);

    };

    const newCustomer = () => {
        setCustomer(initialCustomerState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newCustomer}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="title">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            value={customer.name}
                            onChange={handleInputChange}
                            name="name"
                        />
                        {customer.name.length < 3 && customer.name.length !== 0 ?
                            (<div className="error-input mt-2">Please provide a valid Name ( min 3 characters )</div>) : null}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="Email"
                            required
                            value={customer.email}
                            onChange={handleInputChange}
                            name="email"
                        />
                        {customer.email.length !== 0 && !validateEmail(customer.email) ?
                            (<div className="error-input">Please provide a valid email</div>) : null}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Upload Picture</label>
                        <Button tag={Label} className='mr-75' size='sm' color='primary'>
                            Upload
                            <Input type='file' onChange={onChangePicture} hidden accept='image/*' />
                        </Button>
                    </div>

                    <button onClick={saveCustomer} disabled={!validateEmail(customer.email) || customer.name.length < 3} className="btn btn-success">
                        Submit
                    </button>
                    {message && (
                        <div className="form-group">
                            <div className="alert alert-success" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AddCustomer;