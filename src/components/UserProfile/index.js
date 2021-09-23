import React from "react";

const UserProfile = (props) => {
    return (
        <div>
            <button onClick={props.backFunc}>Back</button>
            <h2>Profile</h2>
        </div>
    )
}

export default UserProfile;