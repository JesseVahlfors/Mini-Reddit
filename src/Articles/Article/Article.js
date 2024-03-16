import React from "react";
import ReactMarkdown from 'react-markdown'
import { formatDate } from "../../Utils/Funcs/timeFormat";
import { getTimeDifferenceString } from "../../Utils/Funcs/time";
import EmbedVideoComponent from "../../Utils/VideoComponents/EmbedVideoComponent";
import MediaPlayer from "../../Utils/VideoComponents/MediaPlayer";
import ImageGallery from "../../Utils/ImageComponents/ImageGallery";
import TwitchEmbedComponent from "../../Utils/VideoComponents/TwitchEmbedComponent";
import ImageOverlay from "../../Utils/ImageComponents/ImageOverlay";
import { useState } from 'react';
import TwitterEmbedComponent from "../../Utils/VideoComponents/TwitterEmbedComponent";


function Article( { article, onClick } ) { 
    const navigatorDateFormat = formatDate(article.time);
    const date = new Date(article.time * 1000);
    const formattedISODate = date.toISOString();

    const handleImageClick = (event) => {
        event.stopPropagation();
    }
    
    //Reddit score
    const [articleScore, setArticleScore] = useState(article.score);
    const [isIncremented, setIsIncremented] = useState(false);
    const [isDecremented, setIsDecremented] = useState(false);
    
    const handleUpArrowClick = (event) => {
        event.stopPropagation();
        if(isIncremented) {
        setArticleScore(articleScore -1);
       } else {
        if (isDecremented) {
            setArticleScore(articleScore +2);
            setIsDecremented(false);
        } else {
            setArticleScore(articleScore +1);
        }
       }
       setIsIncremented(!isIncremented);
    }

    const handleDownArrowClick = (event) => {
        event.stopPropagation();
        if(isDecremented) {
            setArticleScore(articleScore +1);
       } else {
            if (isIncremented) {
                setArticleScore(articleScore -2);

                setIsIncremented(false);
            } else {
                setArticleScore(articleScore -1);
            }
       }
       setIsDecremented(!isDecremented);
    }

    const upArrowClass = `up arrow ${isIncremented ? 'green-arrow' : ''}`;
    const downArrowClass = `down arrow ${isDecremented ? 'green-arrow' : ''}`

    //Image overlay
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [overlayContent, setOverlayContent] = useState(null);

    const handleOpenOverlay = (content) => {
        setOverlayContent(content);
        setIsOverlayOpen(true);
    }

    const handleCloseOverlay = () => {
        setIsOverlayOpen(false);
    }

    //Article media
    let mediaToRender = null;
    if (article.media?.oembed?.type === 'video') {
       mediaToRender = <EmbedVideoComponent html={article.media.oembed.html}/>;
    } else if (article.media?.type === 'twitter.com') {
        mediaToRender = <TwitterEmbedComponent html={article.media.oembed.html}/>;
    } else if (article.media?.type === 'clips.twitch.tv' || article.media?.type === 'twitch.tv') {
        mediaToRender = <TwitchEmbedComponent html={article.media.oembed.html}/>;
    } else if (article.media?.reddit_video) {
        mediaToRender = <MediaPlayer media={article.media} playerId={article.id}  />;
    } else if (article.media_metadata){
        mediaToRender = <ImageGallery metadata={article.media_metadata} />
    } else if (article.image){
        mediaToRender = (
            <button onClick={() => handleOpenOverlay(<img src={article.image} alt={article.title} />)}>
                Show Image
            </button> 
        )
    } else {
        mediaToRender = <ReactMarkdown>{article.paragraph}</ReactMarkdown>
    }
    
    return (
        <div className="article card" id={`article-${article.id}`}>  
        <h4 className="article-subreddit">{article.subreddit}</h4>
            <div className="article-wrapper">
                <div className="score">
                    <button className={upArrowClass} onClick={handleUpArrowClick}></button>
                    <p>{articleScore}</p>
                    <button className={downArrowClass} onClick={handleDownArrowClick}></button>
                </div>
                <div className="article-content" onClick={onClick}>
                    <h2>{article.title}</h2>
                    <div className="media-wrapper" onClick={handleImageClick}>
                        {mediaToRender}
                        <ImageOverlay isOpen={isOverlayOpen} onClose={handleCloseOverlay}>
                            {overlayContent}
                        </ImageOverlay>
                    </div>
                    <div className="article-metadata">
                        <p>{article.author}</p>
                        <time dateTime={formattedISODate} title={navigatorDateFormat}>{getTimeDifferenceString(article.time)}</time>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Article;
