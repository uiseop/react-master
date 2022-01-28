import {
    addDoc,
    collection,
    onSnapshot,
    orderBy,
    query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Nweet from "../components/Nweet";
import { dbService, storageService } from "../myFirebase";
import { ref, uploadString } from "@firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { getApp } from "firebase/app";

const Home = ({ userObj }) => {
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);
    const [attachment, setAttachment] = useState("");
    const onFileChange = (e) => {
        const {
            target: { files },
        } = e;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onload = (finishedEvent) => {
            console.log(finishedEvent);
            setAttachment(finishedEvent.target.result);
        };
        reader.readAsDataURL(theFile);
    };
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
        const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
        const response = await uploadString(fileRef, attachment, "data_url");
        console.log(response);
        // try {
        //     const docRef = await addDoc(collection(dbService, "tweets"), {
        //         tweet,
        //         createdAt: Date.now(),
        //         uid: userObj.uid,
        //     });
        //     setTweet("");
        //     console.log(`Document written with ID: ${docRef.id}`);
        // } catch (e) {
        //     console.log(e);
        // }
    };

    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        setTweet(value);
    };

    const onClearPhotoClick = () => {
        setAttachment("");
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
                <input onChange={onFileChange} type="file" accept="image/*" />
                <button type="submit">Tweet</button>
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={onClearPhotoClick}>Clear</button>
                    </div>
                )}
            </form>
            <div>
                {tweets.map((tweet) => (
                    <Nweet
                        key={tweet.id}
                        tweetObj={tweet}
                        isOwner={tweet.uid === userObj.uid}
                    />
                ))}
            </div>
        </div>
    );
};
export default Home;
