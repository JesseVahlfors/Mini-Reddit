import React from "react";
import ReactMarkdown from 'react-markdown'
import { formatDate } from "../../Utils/Funcs/timeFormat";
import { getTimeDifferenceString } from "../../Utils/Funcs/time";
import EmbedVideoComponent from "../../Utils/VideoComponents/EmbedVideoComponent";
import VideoPlayer from "../../Utils/VideoComponents/VideoPlayer";
import ImageGallery from "../../Utils/ImageComponents/ImageGallery";


function Article( { article, onClick } ) { 
    const navigatorDateFormat = formatDate(article.time)
    const date = new Date(article.time * 1000);
    const formattedISODate = date.toISOString();
    

    let mediaToRender = null;
    if (article.media?.oembed?.type === 'video') {
       mediaToRender =  <EmbedVideoComponent html={article.media.oembed.html} />;
    } else if (article.media?.reddit_video) {
        mediaToRender = <VideoPlayer media={article.media} />;
    } else if (article.media_metadata){
        mediaToRender = <ImageGallery metadata={article.media_metadata} />
    } else {
        mediaToRender = article.image ? <img src={article.image} alt={article.subreddit + " " + article.title}></img> : <ReactMarkdown>{article.paragraph}</ReactMarkdown>
    }

    
    return (
        <div className="article card" id={`article-${article.id}`}>  
            <div className="article-wrapper">
                <div className="score">
                    <button>up</button>
                    <p>{article.score}</p>
                    <button>down</button>
                </div>
                <div className="article-content" onClick={onClick}>
                    <h2>{article.title}</h2>
                    {mediaToRender}
                    <div className="article-metadata">
                        <p>{article.author}</p>
                        <time dateTime={formattedISODate} title={navigatorDateFormat}>{getTimeDifferenceString(article.time)}</time>
                        <p>Comments amount</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Article;
