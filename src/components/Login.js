import React, { useState, useRef, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { login } from "../redux/actions/auth";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const Login = (props) => {
    const history = useHistory();

    const form = useRef();
    const checkBtn = useRef();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');

    //   const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);

    const dispatch = useDispatch();


    const navigateToRegister = () => {
        history.push('/register');
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };


    const handleLogin = (e) => {
        e.preventDefault();

        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            dispatch(login(email, password))
                .then(() => {
                    console.log('88888888888888888888');
                    props.history.push("/home");
                    window.location.reload();
                })
                .catch(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    };

    //   if (isLoggedIn) {
    //     return <Redirect to="/profile" />;
    //   }

    return (
        <Fragment className="test">
            <div className="  col-md-12 ">
                <div className="form-wrapper ">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />

                    <p className="fw-bold">Login to your Account</p>

                    <Form style={{ display: "grid" }} onSubmit={handleLogin} ref={form}>
                        <div className="form-group">
                            <Input
                                type="text"
                                className="form-input "
                                name="email"
                                placeholder='Email'
                                value={email}
                                onChange={onChangeEmail}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <Input
                                type="password"
                                className="form-input"
                                name="password"
                                value={password}
                                placeholder='Password'
                                onChange={onChangePassword}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <button className="form-button mt-4" >
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                LOGIN
                            </button>
                        </div>

                        {message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                        <div className="mt-3 fw-bold">No account yet ?

                            <span onClick={navigateToRegister}
                                style={{ color: '#5886c5', cursor: 'pointer' }}>
                                Create one from here
                            </span>
                        </div>
                        <CheckButton style={{ display: "none" }} ref={checkBtn} />
                    </Form>
                </div>


            </div>
        </Fragment>
    );
};

export default Login;