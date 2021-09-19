import React, { useCallback, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";

import Header from '../Header';
import Tabs from '../Tabs';

import './style.css';
import Loader from "../../elements/Loader";

const Main = () => {
    const [ userContext, setUserContext ] = useContext(UserContext);

    const fetchUserDetails = useCallback(() => {
        fetch("http://localhost:3010/users/me", {
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
                    return { ...oldValues, details: data }
                })
            } else {
                if(response.status === 401) {
                    window.location.reload();
                } else {
                    setUserContext(oldValues => {
                        return { ...oldValues, details: null }
                    })
                }
            }
        })
    }, [setUserContext, userContext.token])

    useEffect(() => {
        if(!userContext.details) {
            fetchUserDetails()
        }
    }, [userContext.details, fetchUserDetails])

    const refetchHandler = () => {
        setUserContext(oldValues => {
            return { ...oldValues, details: undefined }
        })
    }

    return userContext.details === null ? (
        "Error Loading User details"
    ) : !userContext.details ? (
        <Loader />
    ) : (
        <div className="main-wrapper">
            <Header name={userContext.details.username} />
            <Tabs />
        </div>
    )
}

export default Main;