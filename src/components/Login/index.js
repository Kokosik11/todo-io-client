import React, { useState } from 'react';

const Login = () => {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");

    const handleButtonClick = () => {
        console.log(`${username}, pass: ${password}`);
    }

    return (
        <div className="Login">
            <div>
                <label for="username">Ваш никнейм</label>
                <input 
                    type="text" 
                    name="username" 
                    id="username"
                    onChange={e => setUsername(e.target.value)}
                />
            </div>
            
            <div>
            <label for="password">Ваш пароль</label>
                <input 
                    type="password" 
                    name="password" 
                    id="password"
                    onChange={e => setPassword(e.target.value)}
                />
            </div>

            <button className="LoginBtn" onClick={handleButtonClick}>Войти</button>
        </div>
    )
}

export default Login;