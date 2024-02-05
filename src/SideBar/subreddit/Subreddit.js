import React from "react";
import { miniredditIcon } from "../../Utils/Icons/miniRedditIcon";
import { useDispatch, useSelector } from "react-redux";
import { selectSubreddit, selectSelectedSubreddit } from "./subredditSlice";

function Subreddit( {subreddit} ) {
    const icon = subreddit.iconImg ? subreddit.iconImg : subreddit.communityIcon
    const dispatch = useDispatch();
    const selectedSubreddit = useSelector(selectSelectedSubreddit);

    const isSelected = subreddit.id === selectedSubreddit?.id;

    const handleClick = () => {
        dispatch(selectSubreddit(subreddit))
    };
   
    return (
        <li className={isSelected ? "selectedElement subreddit" : "subreddit"}>
            <button onClick={handleClick}>
                {icon ? <img src={icon} alt={subreddit.displayNamePrefixed + " icon"} className="icon"></img> : miniredditIcon }
                <p>{subreddit.displayName}</p>
            </button>
        </li>
    );
};



export default Subreddit;