import logo from './logo.svg';
import React, { useState, useEffect, useCallback, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link, Redirect } from "react-router-dom";
import './App.css';

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import CustomersList from './components/CustomersList';

import { history } from "./helpers/history";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

import { logout } from "./redux/actions/auth";
import Customer from './components/Customer';
import AddCustomer from './components/AddCustomer';
import VerifAccount from './components/VerifAccount';


function App() {

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  localStorage.getItem('access_token')
  const [color, changeColor] = useState("");

  useEffect(() => {
    if(!localStorage.getItem('access_token')){
      <Redirect to='/login' />
    }
  }, []);

  const logOut = useCallback(() => {
    dispatch(logout(currentUser.token));
    history.go("/login");

    localStorage.removeItem("access_token")
    localStorage.removeItem("userData")

  }, [dispatch]);

  return (
    <Router history={history}>
      <Fragment style={{ backgroundColor: color }}>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Settly
          </Link>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/customers"} className="nav-link">
                customers
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/addCustomer"} className="nav-link">
                Add Customer
                </Link>
              </li>
              <li className="nav-item">
                <a  className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (

            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"}  onClick={() => changeColor("#E5E4E2")} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} onClick={() => changeColor("#E5E4E2")}  className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
              )}
            <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

          </div>
          
          
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path={["/", "/login"]} component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/customers" component={CustomersList} />
            <Route exact path="/customers/:id" component={Customer} />
            <Route exact path="/verifAccount/:verification_code" component={VerifAccount} />
            <Route exact path="/addCustomer" component={AddCustomer} />
          </Switch>
        </div>

        {/* <AuthVerify logOut={logOut}/> */}
      </Fragment>
    </Router>
  );
}

export default App;
