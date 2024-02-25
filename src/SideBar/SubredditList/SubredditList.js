import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubreddits, selectSubreddits } from "../../Sidebar/SubredditList/subredditListSlice";
import Subreddit from "../../Sidebar/Subreddit/Subreddit";
import popular from "../../Utils/Icons/popular.svg"

function SubredditsList() {
    const dispatch = useDispatch();
    const subreddits = useSelector(selectSubreddits)

    const popularSubreddit = {
        title: 'Popular subreddit',
        url: '/r/popular/',
        communityIcon: popular,
        id: '12345',
        iconImg: popular,
        displayName: 'Popular',
        displayNamePrefixed: 'r/Popular'
    }

    useEffect(()=> {
        dispatch(fetchSubreddits())
    }, [dispatch])

    return (
        <ul>
            <h2>Subreddits</h2>
            <Subreddit  subreddit={popularSubreddit} />
            { subreddits.map(subreddit => <Subreddit subreddit={subreddit} key={subreddit.id} />)}
        </ul>
    );
};

export default SubredditsList