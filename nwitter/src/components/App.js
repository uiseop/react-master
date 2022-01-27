import { useState } from "react";
import { auth } from "../myFirebase";
import Router from "./Router";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);
    console.log(isLoggedIn)

    return (
        <>
            <Router isLoggedIn={isLoggedIn} />
            <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
        </>
    );
}

export default App;
