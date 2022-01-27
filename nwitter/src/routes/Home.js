import {
    addDoc,
    collection,
    onSnapshot,
    orderBy,
    query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Nweet from "../components/Nweet";
import { auth, dbService } from "../myFirebase";

const Home = ({ userObj }) => {
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);
    // const getTweets = async () => {
    //     const dbTweets = await getDocs(collection(dbService, "tweets"));
    //     dbTweets.forEach((doc) => {
    //         const tweetObj = {
    //             ...doc.data(),
    //             id: doc.id,
    //         };
    //         setTweets((cur) => [tweetObj, ...cur]);
    //     });
    // };

    useEffect(() => {
        const q = query(
            collection(dbService, "tweets"),
            orderBy("createdAt", "desc")
        );
        onSnapshot(q, (snapshot) => {
            const tweetArr = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTweets(tweetArr);
        });
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(dbService, "tweets"), {
                tweet,
                createdAt: Date.now(),
                uid: userObj.uid,
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
            <div>
                {tweets.map((tweet) => (
                    <Nweet key={tweet.id} tweetObj={tweet} isOwner={tweet.uid === userObj.uid}/>
                ))}
            </div>
        </div>
    );
};
export default Home;
