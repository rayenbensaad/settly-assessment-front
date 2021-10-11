import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

const Home = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }



  return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
       
        <p>
          <strong>Id:</strong> {currentUser.user.id}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.user.email}
        </p>
        <p>
          <strong>Hi  {currentUser.user.name}, welcome to your admin account</strong>
        </p>
        
      </div>
  );
};

export default Home;