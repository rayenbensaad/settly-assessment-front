import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { registerUser } from "../redux/actions/auth";
import Recaptcha from 'react-recaptcha';


const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 50) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 50 characters.
      </div>
    );
  }
};

const reCAPTCHA_SITE_KEY = process.env.reCAPTCHA_SITE_KEY


const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [fname, setFname] = useState("");
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();
  const [isP, setIsP] = useState(false);
  const [isVerified, setIsVerified] = useState(false);


  const recaptchaLoaded = () =>{
    console.log('capcha successfully loaded');
  }

  const verifyCallback = (response) => {
    if (response) {
      setIsVerified(true)
    }
  }

  const onChangeUsername = (e) => {
    const name = e.target.value;
    setUsername(name);
  };

  const onChangeFname = (e) => {
    const fname = e.target.value;
    setFname(fname);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangePasswordConfirmation = (e) => {
    const passwordConfirmation = e.target.value;
    setPasswordConfirmation(passwordConfirmation);
  };
  const onChangeP = () => {
    setIsP(true)
  };

  const handleRegister = (e) => {

    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    const data = {
      fname: name,
      name: name,
      email: email,
      password: password,
      password_confirmation: password

    }

    console.log(data);
    if (isVerified) {
      if (checkBtn.current.context._errors.length === 0) {
        dispatch(registerUser(data))
          .then(() => {
            setSuccessful(true);
          })
          .catch(() => {
            setSuccessful(false);
          });
      }
    } else {
      alert('Please verify that you are a human!');
    }

  };

  
  return (
    <div className="col-md-12">
      <div className="form-wrapper">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <p className="fw-bold">Create your Account</p>
        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <Input
                type="text"
                className="form-input"
                name="name"
                value={fname}
                placeholder='First Name'
                onChange={onChangeFname}
                validations={[required, vusername]}
              />

              <Input
                type="text"
                className="form-input"
                name="name"
                value={name}
                placeholder='Name'
                onChange={onChangeUsername}
                validations={[required, vusername]}
              />

              <Input
                type="text"
                className="form-input"
                name="email"
                placeholder='Email'
                value={email}
                onChange={onChangeEmail}
                validations={[required, validEmail]}
              />
              <Input
                type="password"
                className="form-input"
                name="password"
                value={password}
                placeholder='Password'
                onChange={onChangePassword}
                validations={[required, vpassword]}
              />

              <Input
                type="password"
                className="form-input"
                name="Confirmed password"
                placeholder='Confirmed Password'
                value={passwordConfirmation}
                onChange={onChangePasswordConfirmation}
                onMouseLeave={onChangeP}
                validations={[required, vpassword]}
              />
              {password !== passwordConfirmation &&  isP === true &&(
                <div className="alert alert-danger" role="alert">
                  The password must be match.
                </div>
              )}

              <div className="form-group">
                <button  className="form-button">Sign Up</button>
              </div>
            </div>
          )}
          {message && (
            <div className="form-group">
              <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                {message}
                <br/>
                Check you email to verify your account
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />

      <p>This form is protected by Recaptcha</p>

      <Recaptcha
            sitekey="6Ld8-cAcAAAAAEy95Nb8Yc2vYGzxqqGXG0d4OTfs"
            render="explicit"
            onloadCallback={recaptchaLoaded}
            verifyCallback={verifyCallback}
          />
        </Form>
      </div>
    </div>
  );
};

export default Register;