import { useEffect, useState } from "react";
import { auth } from "../myFirebase";
import Router from "./Router";

function App() {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
            setInit(true);
        });
    }, []);
    return (
        <>
            {init ? <Router isLoggedIn={isLoggedIn} /> : "Initializing..."}
            <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
        </>
    );
}

export default App;
