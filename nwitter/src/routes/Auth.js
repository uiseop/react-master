import React, { useState } from "react";
import {
    createUserWithEmailAndPassword,
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { auth } from "../myFirebase";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            let data;
            if (newAccount) {
                // create Account
                data = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
            } else {
                // Log In
                data = await signInWithEmailAndPassword(auth, email, password);
            }
            console.log(data);
        } catch (e) {
            setError(e.message);
            console.log(e);
        }
    };

    const toggleAccount = () => setNewAccount((cur) => !cur);
    const onSocialClick = async (e) => {
        const {
            target: { name },
        } = e;
        let provider;
        if (name === "google") {
            // google
            provider = new GoogleAuthProvider();
        } else if (name === "github") {
            // github
            provider = new GithubAuthProvider();
        }
        const res = await signInWithPopup(auth, provider);
        const user = res.user;
        console.log(res);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    onChange={onChange}
                    name="email"
                    value={email}
                    type="email"
                    required
                    placeholder="email"
                />
                <input
                    onChange={onChange}
                    name="password"
                    value={password}
                    type="password"
                    placeholder="password"
                    required
                />

                <button type="submit">
                    {newAccount ? "Create Account" : "Log In"}
                </button>
                {error}
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "Log In" : "Create Account"}
            </span>
            <div>
                <button onClick={onSocialClick} name="google">
                    Continue withe Google
                </button>
                <button onClick={onSocialClick} name="github">
                    Continue withe Github
                </button>
            </div>
        </div>
    );
};
export default Auth;
