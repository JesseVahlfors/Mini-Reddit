import React from "react";
import { useSelector } from "react-redux";
import { selectSubreddits } from "../../Sidebar/SubredditList/subredditListSlice";

function SubredditsList() {
    const subreddits = useSelector(selectSubreddits)

    return (
        <div>
            <h2>Subreddits</h2>
            { subreddits.map(subreddit => <Subreddit subreddit={subreddit} key={subreddit.id} />)}
        </div>
    )
}