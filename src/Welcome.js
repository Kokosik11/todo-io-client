import React, { useContext, useState, useEffect, useCallback } from 'react';
import { UserContext } from './context/UserContext';

import Logo from "./assets/logo.png";
import "./welcome.css";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Main from "./components/Main";

import Loader from "./elements/Loader";

const ForLogin = (props) => {
  return(
    <div>
      <div className="is-content">
        <div className="line"></div>
        <div className="IsNotAuth">if not sign up?</div>
        <div className="line"></div>
      </div>
      <button className="SignupBtn second-btn" onClick={props.handle}>Create account</button>
    </div>
  )
}

const ForSignup = (props) => {
  return(
    <div>
      <div className="is-content">
        <div className="line"></div>
        <div className="IsNotAuth">Already sign up?</div>
        <div className="line"></div>
      </div>
      <button className="LoginBtn second-btn" onClick={props.handle}>Log in</button>
    </div>
  )
}

const Welcome = () => {
  const [ isSingUp, setSingUp ] = useState(false);
  const [ userContext, setUserContext ] = useContext(UserContext);

  const verifyUser = useCallback(() => {
    fetch("http://localhost:3010/users/refreshToken", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }).then(async response => {
      if(response.ok) {
        const data = await response.json();
        setUserContext(oldValues => {
          return { ...oldValues, token: data.token }
        })
      } else {
        setUserContext(oldValues => {
          return { ...oldValues, token: null }
        })
      }

      setTimeout(verifyUser, 5 * 60 * 1000);
    })
  }, [setUserContext])

  useEffect(() => {
    verifyUser();
  }, [verifyUser])

  const handleButtonClick = () => {
    setSingUp(!isSingUp);
  }

  return userContext.token === null ? (
    <div className="Welcome">
      <div className="Form">
        <div className="heading">
          <img src={Logo} alt="Logo"/>
          <h1>Todo.io</h1>
        </div>
        <div className="FormContent">
          {isSingUp ? <Signup /> : <Login />}
          {isSingUp ? <ForSignup handle={handleButtonClick}/> : <ForLogin handle={handleButtonClick}/>}
        </div>
      </div>
    </div>
  ) : userContext.token ? (
    <Main />
  ) : (
    <Loader />
  );
}

export default Welcome;
