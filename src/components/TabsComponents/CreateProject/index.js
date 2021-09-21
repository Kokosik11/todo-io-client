import React, { useState, useContext } from 'react';
import { UserContext } from '../../../context/UserContext';

import "./style.css";

const CreateProject = () => {
    const [ projectTitle, setProjectTitle ] = useState("");
    const [ projectDescription, setProjectDescription ] = useState("");
    const [ projectActions, setProjectActions ] = useState([]);
    const [ error, setError ] = useState("")
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ userContext, setUserContext ] = useContext(UserContext);
    // const [ projectIcon, setProjectIcon ] = useState("");

    const addAction = () => {
        let action = { id: projectActions.length, title: "", isCompleted: false }

        setProjectActions([action, ...projectActions]);
    }
    
    const handleChangeActionCompleted = (id) => {
        let actions = projectActions.map(action => (
            (action.id === id && { ...action, isCompleted: !action.isCompleted }) || action
        ))

        setProjectActions([...actions]);
    }

    const handleChangeActionTitle = (id, value) => {
        let actions = projectActions.map(action => (
            (action.id === id && { ...action, title: value }) || action
        ))

        setProjectActions([...actions]);
        console.log(projectActions)
    }

    const submitHandler = e => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        const genericErrorMessage = "Error! Please try again later";

        fetch("http://localhost:3010/users/project/create", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userContext.token}`
            },

            body: JSON.stringify({ projectTitle, projectDescription, projectActions: [...projectActions] })
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
                }
            })
            .catch(error => {
                setIsSubmitting(false)
                setError(genericErrorMessage)
            })
    }

    return (
        <div className="create-project">
            <h2>Create project</h2>
            <div className="create-project_content">
                <input 
                    type="text" 
                    placeholder="Project title..." 
                    id="projectTitle"
                    name="projectTitle"
                    onChange={e => setProjectTitle(e.target.value)}
                />

                <textarea 
                    type="text" 
                    placeholder="Project description..." 
                    id="projectDescription"
                    name="projectDescription"
                    onChange={e => setProjectDescription(e.target.value)}
                />

                <div className="project-action">
                    <div className="project-action_heading">
                        <div className="project-action_title">Project actions</div>
                        <button className="project-action_add" onClick={() => addAction()}>+</button>
                    </div>
                    <div className="project-action_placement">
                        {projectActions.map(action => (
                            <div key={action.id} className="project-action_new-action">
                                <input
                                    type="text"
                                    placeholder="Action title..."
                                    id="action"
                                    name="action"
                                    onChange={e => handleChangeActionTitle(action.id, e.target.value)}
                                />
                                <input 
                                    type="checkbox"
                                    name="isCompleted"
                                    id="isCompleted"
                                    checked={action.isCompleted ? "checked" : "" }
                                    onChange={() => handleChangeActionCompleted(action.id)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <button onClick={submitHandler}>Create project</button>
            </div>
        </div>
        
    )
}

export default CreateProject;