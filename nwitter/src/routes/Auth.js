import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../myFirebase";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);

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
                data = await createUserWithEmailAndPassword(auth, email, password)
            } else {
                // Log In
                data = await signInWithEmailAndPassword(auth, email, password)
            }
            console.log(data);
        } catch(e) {
            console.log("haha",e)
        }
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
            </form>
            <div>
                <button>Continue withe Google</button>
                <button>Continue withe Github</button>
            </div>
        </div>
    );
};
export default Auth;
