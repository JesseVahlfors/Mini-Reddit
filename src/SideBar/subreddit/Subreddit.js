import React from "react";
import { miniredditIcon } from "../../Utils/Icons/miniRedditIcon";

function Subreddit( {subreddit} ) {
    const icon = subreddit.iconImg ? subreddit.iconImg : subreddit.communityIcon
    return (
        <div className="subreddit">
            <div className="icon">
                {icon ? <img src={icon} alt={subreddit.displayNamePrefixed + " icon"}></img> : miniredditIcon }
            </div>
            <h3>{subreddit.displayName}</h3>
        </div>
    );
};

export default Subreddit;