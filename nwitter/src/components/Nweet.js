import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { dbService } from "../myFirebase";

const Nweet = ({ tweetObj, isOwner }) => {
    const [editting, setEditting] = useState(false);
    const [newTweet, setNewTweet] = useState(tweetObj.tweet);
    const TweetRef = doc(dbService, "tweets", `${tweetObj.id}`);

    const onDeleteClick = async () => {
        const ok = window.confirm("정말로 삭제하시겠습니까?");
        if (ok) {
            await deleteDoc(TweetRef);
        }
    };

    const onEditting = (e) => {
        const {
            target: { value },
        } = e;
        setNewTweet(value) 
    };

    const toggleEditting = () => setEditting((cur) => !cur);

    const onSubmit = async (e) => {
        e.preventDefault();
        await updateDoc(TweetRef, {
            tweet: newTweet
        });
        setEditting(false);
    }

    return (
        <div>
            {editting ? (
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        onChange={onEditting}
                        placeholder="Edit your Tweet"
                        value={newTweet}
                        required
                    />
                    <button onClick={toggleEditting}>Cancel</button>
                    <button type="submit">Submit</button>
                </form>
            ) : (
                <>
                    <h4>{tweetObj.tweet}</h4>
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>Delete</button>
                            <button onClick={toggleEditting}>Edit</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Nweet;
