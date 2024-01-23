import React from "react";
import Comment from "../Comment/Comment";
import ReactMarkdown from 'react-markdown'

function Article( { article } ) { 

    return (
        <div className="article">
            <img src="https://www.reddit.com/user/Tmonkey18/avatar"></img>
            <h2>{article.title}</h2>
            <ReactMarkdown>{article.paragraph}</ReactMarkdown>
            <img src={article.image} alt={article.subreddit + article.title}></img>
            <Comment id={article.id} />
        </div>
    );
}

export default Article;
