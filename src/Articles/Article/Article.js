import React from "react";
import Comments from "../Comments/Comments";
import ReactMarkdown from 'react-markdown'
import { formatDate } from "../../Utils/Funcs/timeFormat";
import { getTimeDifferenceString } from "../../Utils/Funcs/time";


function Article( { article } ) { 
    const navigatorDateFormat = formatDate(article.time)
    const date = new Date(article.time * 1000);
    const formattedISODate = date.toISOString();
    
    return (
        <div className="article">
            <h2>{article.title}</h2>
            <p>{article.score}</p>
            <ReactMarkdown>{article.paragraph}</ReactMarkdown>
            {article.image ? <img src={article.image} alt={article.subreddit + " " + article.title}></img> : null}
            <p>{article.author}</p>
            <time dateTime={formattedISODate} title={navigatorDateFormat}>{getTimeDifferenceString(article.time)}</time>
            <Comments />
        </div>
    );
}

export default Article;
