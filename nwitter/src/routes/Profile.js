import React from "react";
import { auth } from "../myFirebase";

const Profile = () => {
    const onLogOutClick = () => {
        auth.signOut();
    }
    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};
export default Profile;
