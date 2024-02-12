import React, {useEffect, useState} from "react";
import Comments from "../Comments/Comments";
import ReactMarkdown from 'react-markdown'
import { formatDate } from "../../Utils/Funcs/timeFormat";
import { getTimeDifferenceString } from "../../Utils/Funcs/time";
import ImageGallery from "../../Utils/ImageComponents/ImageGallery";
import VideoPlayer from "../../Utils/VideoComponents/VideoPlayer";
import EmbedVideoComponent from "../../Utils/VideoComponents/EmbedVideoComponent";


function DetailedArticle( { article, onBackButtonClick } ) { 
    const navigatorDateFormat = formatDate(article.time)
    const date = new Date(article.time * 1000);
    const formattedISODate = date.toISOString();
    const [commentClicked, setCommentClicked] = useState(false);

    
    let mediaToRender = null;
    if (article.media?.oembed?.type === 'video') {
       mediaToRender =  <EmbedVideoComponent html={article.media.oembed.html} />;
    } else if (article.media?.reddit_video) {
        mediaToRender = <VideoPlayer media={article.media} />;
    } else if (article.media_metadata){
        mediaToRender = <ImageGallery metadata={article.media_metadata} />
    } else {
        mediaToRender = article.image ? <img src={article.image} alt={article.subreddit + " " + article.title}></img> : null; 
    }

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
            {mediaToRender}
            <p>{article.author}</p>
            <time dateTime={formattedISODate} title={navigatorDateFormat}>{getTimeDifferenceString(article.time)}</time>
            <button onClick={handleCommentClick}>Comments</button>
            {commentClicked ? <Comments /> : null}
        </div>
    );
}

export default DetailedArticle;