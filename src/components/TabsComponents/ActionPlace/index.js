import React, { useCallback, useContext, useEffect } from "react";
import { UserContext } from "../../../context/UserContext"

import Loader from "../../../elements/Loader";
import EditSquare from "../../../assets/Edit-Square.svg";

import "./style.css";

const ActionPlace = props => {
    const [ userContext, setUserContext ] = useContext(UserContext);

    const fetchUserDetails = useCallback(() => {
        fetch("http://localhost:3010/users/action/", {
            method: "GET",
            credentials: "include",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userContext.token}`
            }
        }).then(async response => {
            if(response.ok) {
                const data = await response.json();
                setUserContext(oldValues => {
                    return { ...oldValues, actions: data }
                })
            } else {
                if(response.status === 401) {
                    window.location.reload();
                } else {
                    setUserContext(oldValues => {
                        return { ...oldValues, actions: null }
                    })
                }
            }
        })
    }, [setUserContext, userContext.token])

    useEffect(() => {
        if(!userContext.actions) {
            fetchUserDetails()
        }
    }, [userContext.actions, fetchUserDetails])

    const dateNow = new Date();

    const getTimeLefts = time => {
        let lefts = Math.trunc((dateNow - new Date(time)) / 1000 / 60 / 60)
        
        if(lefts > 24 * 30) {
            return (
                <span>{Math.trunc(lefts/24/30)} months left</span>
            )
        } else if(lefts > 24 * 7) {
            return (
                <span>{Math.trunc(lefts/24/7)} weeks left</span>
            )
        } else if(lefts > 24) {
            return (
                <span>{Math.trunc(lefts/24)} days left</span>
            )
        } else {
            return (
                <span>{lefts} hours left</span>
            )
        }

    }

    return userContext.actions === null ? (
        "Error Loading User details"
    ) : !userContext.actions ? (
        <Loader />
    ) : (
        <div className="actionplace">
            <div className="actionplace-content">
                {
                userContext.actions.map((action) => (
                    <div key={action._id} className="Action">
                        <div className="daylefts">
                            <div className="circle red"></div>
                            <div className="daylefts-content">
                                {getTimeLefts(action.creationDate)}
                            </div>
                        </div>
                        
                        <div className="action-title">
                            <h2>{action.title}</h2>
                            <div className="description">{action.description}</div>
                        </div>

                        <div className="mini-statistic">
                            {action.Todoes.length}
                        </div>
                    </div>
                ))
                }

                <div className="action-create">
                    <div>
                        <img src={EditSquare} alt="Edit Square icon" />
                        Add project
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActionPlace;