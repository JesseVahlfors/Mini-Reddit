import React from "react";
import { miniredditIcon } from "../../Utils/Icons/miniRedditIcon";

function Subreddit( {subreddit} ) {
    const icon = subreddit.iconImg ? subreddit.iconImg : subreddit.communityIcon
    return (
        <div>
            {icon ? <img src={icon} alt={subreddit.displayNamePrefixed + " icon"}></img> : miniredditIcon }
            <h2>{subreddit.displayName}</h2>
            <p></p>
        </div>
    );
};

export default Subreddit;