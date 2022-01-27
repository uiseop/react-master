import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { dbService } from "../myFirebase";

const Home = () => {
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);

    const getTweets = async () => {
        const dbTweets = await getDocs(collection(dbService, "tweets"));
        dbTweets.forEach((doc) => setTweets((cur) => [doc.data(), ...cur]));
    };

    useEffect(() => {
        getTweets();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(dbService, "tweets"), {
                tweet,
                createdAt: Date.now(),
            });
            setTweet("");
            console.log(`Document written with ID: ${docRef.id}`);
        } catch (e) {
            console.log(e);
        }
    };

    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        setTweet(value);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                    onChange={onChange}
                    value={tweet}
                />
                <button type="submit">Tweet</button>
            </form>
        </div>
    );
};
export default Home;
