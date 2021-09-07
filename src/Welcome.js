import React, { useState } from 'react';
import Logo from "./assets/logo.png";
import "./welcome.css";

import Login from "./components/Login";
import Signup from "./components/Signup";

const ForLogin = (props) => {
  return(
    <div>
      <div class="is-content">
        <div className="line"></div>
        <div className="IsNotAuth">Ещё не зарегистрированы?</div>
        <div className="line"></div>
      </div>
      <button className="SignupBtn" onClick={props.handle}>Зарегистрироваться</button>
    </div>
  )
}

const ForSignup = (props) => {
  return(
    <div>
      <div class="is-content">
        <div className="line"></div>
        <div className="IsNotAuth">Уже зарегистрированы?</div>
        <div className="line"></div>
      </div>
      <button className="LoginBtn" onClick={props.handle}>Войти</button>
    </div>
  )
}

const Welcome = () => {
  const [ isSingUp, setSingUp ] = useState(false);

  const handleButtonClick = () => {
    setSingUp(!isSingUp);
  }

  return (
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
  );
}

export default Welcome;
