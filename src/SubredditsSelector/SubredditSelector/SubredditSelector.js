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
    
    return (
        <div className="subreddit-selector">
            <label htmlFor="subreddit">Select Subreddit:</label>
            <select
            id="subreddit"
            value={selectedSubreddit}
            onChange={handleSubredditChange}
            >
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