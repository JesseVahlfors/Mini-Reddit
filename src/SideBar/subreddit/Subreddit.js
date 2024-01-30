import React from "react";

function Subreddit( {subreddit} ) {
    const icon = subreddit.iconImg ? subreddit.iconImg : subreddit.communityIcon
    return (
        <div>
            <img src={icon} alt={subreddit.displayNamePrefixed + " icon"}></img>
            <h2>{subreddit.displayName}</h2>
            <p></p>
        </div>
    );
};

export default Subreddit;