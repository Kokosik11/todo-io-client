import React from 'react';

import './style.css';

import Logo from '../../assets/logo.png';
import UnkAvatar from '../../assets/unknown-avatar.png';

const Header = props => {
    return (
        <div className="Header">
            <div className="Logo">
                <img src={Logo} alt="Logo"/>
                <h1>Todo.io</h1>
            </div>

            <div className="user-details">
                <div className="welcome-phrase">Lets do this, <a href="/">{props.name}</a></div>
                <img className="avatar" src={props.avatar ? props.avatar : UnkAvatar} alt="avatar"/>
            </div>
        </div>
    )
}

export default Header;