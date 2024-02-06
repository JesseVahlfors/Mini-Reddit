import React from "react";
import { useSelector } from "react-redux";
import { selectSubreddits } from "./subredditListSlice";
import Subreddit from "../../Sidebar/Subreddit/Subreddit";

function SubredditsList() {
    const subreddits = useSelector(selectSubreddits)

    return (
        <ul>
            <h2>Subreddits</h2>
            { subreddits.map(subreddit => <Subreddit subreddit={subreddit} key={subreddit.id} />)}
        </ul>
    );
};

export default SubredditsList