import React, { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSubreddits } from "../../Sidebar/SubredditList/subredditListSlice";
import { fetchArticles } from "../../Articles/Articles/articlesSlice";

function SubredditSelector() {
    const subreddits = useSelector(selectSubreddits);
    const dispatch = useDispatch();
    const [selectedSubreddit, setSelectedSubreddit] = useState("");

    const handleSubredditChange = (event) => {
        setSelectedSubreddit(event.target.value);
        if (selectSubreddits !== event.target.value){
        dispatch(fetchArticles(selectedSubreddit))
        }
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
            value={selectedSubreddit}
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