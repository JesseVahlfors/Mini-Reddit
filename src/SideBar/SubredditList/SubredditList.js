import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubreddits, selectSubreddits } from "../../Sidebar/SubredditList/subredditListSlice";
import Subreddit from "../../Sidebar/Subreddit/Subreddit";

function SubredditsList() {
    const dispatch = useDispatch();
    const subreddits = useSelector(selectSubreddits)

    useEffect(()=> {
        dispatch(fetchSubreddits())
    }, [dispatch])

    return (
        <ul>
            <h2>Subreddits</h2>
            { subreddits.map(subreddit => <Subreddit subreddit={subreddit} key={subreddit.id} />)}
        </ul>
    );
};

export default SubredditsList