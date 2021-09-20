import React, { useState } from "react"
import { ActionPlace, Friends, CurrentProject, CreateAction } from "../TabsComponents";
import Search from "../../assets/Search.svg";

import './style.css';

const Tabs = props => {
    const [ currentTab, setCurrentTab ] = useState(0);

    const handleButtonClick = num => {
        setCurrentTab(num);
    }
    
    return (
        <div className="content">
            <div className="Tabs">
                <div className="tabHeader">
                    <div className="navigation">
                        <button onClick={() => { handleButtonClick(0) }} className={currentTab === 0 ? "tab-button tab-button_active" : "tab-button"}>My Projects</button>
                        <button onClick={() => { handleButtonClick(1) }} className={currentTab === 1 ? "tab-button tab-button_active" : "tab-button"}>Friends</button>
                        <button onClick={() => { handleButtonClick(2) }} className={currentTab === 2 ? "tab-button tab-button_active" : "tab-button"}>Current Project</button>
                    </div>

                    <div className="search">
                        <img src={Search} alt="Search icon" /   >
                        <input type="text" placeholder="Discover" />
                    </div>
                </div>

                <div className="component-papper">
                    { currentTab === 0 ? <ActionPlace handleButtonClick={handleButtonClick} /> : 
                    currentTab === 1 ? <Friends /> : 
                    currentTab === 2 ? <CurrentProject /> : 
                    currentTab === 3 ? <CreateAction /> :
                    "Component not found" }

                </div>
            </div>
        </div>
    )
}

export default Tabs;