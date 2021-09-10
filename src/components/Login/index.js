import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';

const Login = () => {
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ error, setError ] = useState("")
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ userContext, setUserContext ] = useContext(UserContext);

    const submitHandler = e => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        const genericErrorMessage = "Error! Please try again later";

        fetch("http://localhost:3010/users/login", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        })
            .then(async response => {
                setIsSubmitting(false);
                if(!response.ok) {
                    if (response.status === 400) {
                        setError("Please fill all the fields correctly!")
                    } else if (response.status === 401) {
                        setError("Invalid email and password combination.")
                    } else {
                        setError(genericErrorMessage)
                    }
                } else {
                    const data = await response.json();
                    setUserContext(oldValues => {
                        return { ...oldValues, token: data.token }
                    })
                }
            })
            .catch(error => {
                setIsSubmitting(false)
                setError(genericErrorMessage)
            })
    }

    const handleButtonClick = () => {
        console.log(`${username}, pass: ${password}`);
    }

    return (
        <div className="Login">
            <div className="ErrorMessage">
                {error}
            </div>
            <div>
                <label htmlFor="username">Your nickname</label>
                <input 
                    type="text" 
                    name="username" 
                    id="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
            </div>
            
            <div>
            <label htmlFor="password">Your password</label>
                <input 
                    type="password" 
                    name="password" 
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>

            <button className="LoginBtn" onClick={submitHandler}>{isSubmitting ? "Waiting..." : "Log in"}</button>
        </div>
    )
}

export default Login;