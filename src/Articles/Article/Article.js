import React from "react";
import ReactMarkdown from 'react-markdown'
import { formatDate } from "../../Utils/Funcs/timeFormat";
import { getTimeDifferenceString } from "../../Utils/Funcs/time";


function Article( { article, onClick } ) { 
    const navigatorDateFormat = formatDate(article.time)
    const date = new Date(article.time * 1000);
    const formattedISODate = date.toISOString();

    
    return (
        <div className="article card" id={`article-${article.id}`}>  
            <div className="article-wrapper">
                <div className="score">
                    <button>up</button>
                    <p>{article.score}</p>
                    <button>down</button>
                </div>
                <div className="article-container" onClick={onClick}>
                    <h2>{article.title}</h2>
                    {article.image ? <img src={article.image} alt={article.subreddit + " " + article.title}></img> : <ReactMarkdown>{article.paragraph}</ReactMarkdown>}
                    <p>{article.author}</p>
                    <time dateTime={formattedISODate} title={navigatorDateFormat}>{getTimeDifferenceString(article.time)}</time>
                    <p>Comments amount</p>
                </div>
            </div>
        </div>
    );
}

export default Article;
