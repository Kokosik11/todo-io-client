import React, { useState } from 'react';

const Signup = () => {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ repeatPass, seReapetPass ] = useState("");

    const handleButtonClick = () => {
        console.log(`${username}, pass: ${password}, repeated pass: ${repeatPass}`);
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
            
            <div>
                <label for="repeatpass">Повторите пароль</label>
                <input 
                    type="password" 
                    name="repeatpass" 
                    id="repeatpass"
                    onChange={e => seReapetPass(e.target.value)}
                />
            </div>
            
            <button className="SignupBtn" onClick={handleButtonClick}>Зарегистрироваться</button>
        </div>
    )
}

export default Signup;