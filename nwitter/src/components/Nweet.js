const Nweet = ({ tweetObj, isOwner }) => {
    return (
        <div>
            <h4>{tweetObj.tweet}</h4>
            {isOwner && (
                <>
                    <button>Delete</button>
                    <button>Edit</button>
                </>
            )}
        </div>
    );
};

export default Nweet;
