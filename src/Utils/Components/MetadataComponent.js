import React from "react";
import TimeAgo from "./TimeAgo";

function MetadataComponent({article}) {

    return (
        <div className="article-metadata">
            <div className="article-subreddit-container">
                <h4 className="article-subreddit">{article.subreddit}</h4>
                <TimeAgo timestamp={article.time}/>
            </div>
            <p className="article-topbar-paragraph">{article.author}</p>
        </div>
    );
};

export default MetadataComponent;