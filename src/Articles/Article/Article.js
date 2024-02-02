import React from "react";
import ReactMarkdown from 'react-markdown'
import { formatDate } from "../../Utils/Funcs/timeFormat";
import { getTimeDifferenceString } from "../../Utils/Funcs/time";


function Article( { article, onClick } ) { 
    const navigatorDateFormat = formatDate(article.time)
    const date = new Date(article.time * 1000);
    const formattedISODate = date.toISOString();

    
    return (
        <div className="article" onClick={onClick} id={`article-${article.id}`}>
            <h2>{article.title}</h2>
            <p>{article.score}</p>
            {article.image ? <img src={article.image} alt={article.subreddit + " " + article.title}></img> : <ReactMarkdown>{article.paragraph}</ReactMarkdown>}
            <p>{article.author}</p>
            <time dateTime={formattedISODate} title={navigatorDateFormat}>{getTimeDifferenceString(article.time)}</time>
            <p>Comments amount</p>
        </div>
    );
}

export default Article;
