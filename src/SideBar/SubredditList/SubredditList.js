import React from "react";
import { useSelector } from "react-redux";
import { selectSubreddits } from "./subredditListSlice";
import Subreddit from "../../Sidebar/Subreddit/Subreddit";

function SubredditsList() {
    const subreddits = useSelector(selectSubreddits)

    return (
        <ul>
            { subreddits.map(subreddit => <Subreddit subreddit={subreddit} key={subreddit.id} />)}
        </ul>
    );
};

export default SubredditsList