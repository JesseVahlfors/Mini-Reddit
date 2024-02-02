import React, { useState} from "react";
import { useSelector } from "react-redux";
import { selectSubreddits } from "../../Sidebar/SubredditList/subredditListSlice";

function SubredditSelector() {
    const subreddits = useSelector(selectSubreddits);
    const [selectedSubreddit, setSelectedSubreddit] = useState("");

    const handleSubredditChange = (event) => {
        setSelectedSubreddit(event.target.value);
    }

    return (
        <div className="subreddit-selector">
            <label htmlFor="subreddit">Select Subreddit:</label>
            <select
            id="subreddit"
            value={selectedSubreddit}
            onChange={handleSubredditChange}
            >
                <option value="">-- All Subreddits --</option>
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