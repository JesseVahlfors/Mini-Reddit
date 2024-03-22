import React, { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSubreddits } from "../../Sidebar/SubredditList/subredditListSlice";
import { selectSubreddit, selectSelectedSubreddit } from "../../Sidebar/Subreddit/subredditSlice";

function SubredditSelector() {
    const subreddits = useSelector(selectSubreddits);
    const dispatch = useDispatch();
    const selectedSubreddit = useSelector(selectSelectedSubreddit);

    const handleSubredditChange = (event) => {
        const newSelectedSubreddit = event.target.value;
        const subreddit = subreddits.find(sub => sub.displayName === newSelectedSubreddit) || popularSubreddit;
        dispatch(selectSubreddit(subreddit))
    }
    const popularSubreddit = {
        title: 'No such thing as stupid questions',
        url: '/r/popular/',
        id: '12345',
        displayName: 'Popular',
        displayNamePrefixed: 'r/Popular'
    }
    
    return (
        <div className="subreddit-selector">
            <label htmlFor="subreddit">Select Subreddit:</label>
            <select
            id="subreddit"
            value={selectedSubreddit?.displayName || 'Popular'}
            onChange={handleSubredditChange}
            >
                <option key={popularSubreddit.id} value={popularSubreddit.displayName}>
                        {popularSubreddit.displayName}
                    </option>
                {subreddits.map((subreddit) => (
                    <option key={subreddit.id} value={subreddit.displayName}>
                        {subreddit.displayName}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SubredditSelector;