import React, {useEffect, useState} from "react";
import Comments from "../Comments/Comments";
import ReactMarkdown from 'react-markdown'
import { formatDate } from "../../Utils/Funcs/timeFormat";
import { getTimeDifferenceString } from "../../Utils/Funcs/time";


function DetailedArticle( { article, onBackButtonClick } ) { 
    const navigatorDateFormat = formatDate(article.time)
    const date = new Date(article.time * 1000);
    const formattedISODate = date.toISOString();
    const [commentClicked, setCommentClicked] = useState(false);

    const handleCommentClick = () => {
        setCommentClicked(!commentClicked);
    };

    useEffect(() => {
        window.scrollTo(0,0);

        return () => {
            const articleElement = document.getElementById(`article-${article.id}`);
            if (articleElement) {
                const topOffset = articleElement.offsetTop;
                window.scrollTo(0, topOffset);
            }
        };
    }, [article.id])

    
    return (
        <div className="article card" >
            <h2>{article.title}</h2>
            <button onClick={onBackButtonClick}>Back</button>
            <div className="score">
                <button>up</button>
                <p>{article.score}</p>
                <button>down</button>
            </div>
            <ReactMarkdown>{article.paragraph}</ReactMarkdown>
            {article.image ? <img src={article.image} alt={article.subreddit + " " + article.title}></img> : null}
            <p>{article.author}</p>
            <time dateTime={formattedISODate} title={navigatorDateFormat}>{getTimeDifferenceString(article.time)}</time>
            <button onClick={handleCommentClick}>Comments</button>
            {commentClicked ? <Comments /> : null}
        </div>
    );
}

export default DetailedArticle;