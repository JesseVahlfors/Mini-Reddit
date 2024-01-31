import React from "react";
import { useSelector } from "react-redux";
import { selectSubreddits } from "./subredditListSlice";
import Subreddit from "../../Sidebar/Subreddit/Subreddit";

function SubredditsList() {
    const subreddits = useSelector(selectSubreddits)

    return (
        <div>
            { subreddits.map(subreddit => <Subreddit subreddit={subreddit} key={subreddit.id} />)}
        </div>
    );
};

export default SubredditsList