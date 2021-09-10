import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';

const Signup = () => {
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ error, setError ] = useState("")
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ repeatPass, seReapetPass ] = useState("");
    const [ userContext, setUserContext ] = useContext(UserContext);

    const submitHandler = e => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        const genericErrorMessage = "Error! Please try again later";
        if(password === repeatPass) {
            fetch("http://localhost:3010/users/signup", {
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
                        } else if (response.status === 500) {
                            console.log(response)
                            const data = await response.json()
                            if (data.message) setError(data.message || genericErrorMessage)
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
        } else {
            setIsSubmitting(false)
            setError("Please fill all password fields correctly!");
        }
        
    }

    const handleButtonClick = () => {
        console.log(`${username}, pass: ${password}, repeated pass: ${repeatPass}`);
    }

    return (
        <div className="Signup">
            <div className="ErrorMessage">
                {error}
            </div>
            <div>
                <label htmlFor="username">Your nickname</label>
                <input 
                    type="text" 
                    name="username" 
                    id="username"
                    onChange={e => setUsername(e.target.value)}
                />
            </div>
            
            <div>
                <label htmlFor="password">Your password</label>
                <input 
                    type="password" 
                    name="password" 
                    id="password"
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            
            <div>
                <label htmlFor="repeatpass">Repeat your password</label>
                <input 
                    type="password" 
                    name="repeatpass" 
                    id="repeatpass"
                    onChange={e => seReapetPass(e.target.value)}
                />
            </div>
            
            <button className="LoginBtn" onClick={submitHandler}>{isSubmitting ? "Waiting..." : "Sign up"}</button>
        </div>
    )
}

export default Signup;