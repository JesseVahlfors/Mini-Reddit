import React, {useEffect, useState} from "react";
import Comments from "../Comments/Comments";
import ReactMarkdown from 'react-markdown'
import { formatDate } from "../../Utils/Funcs/timeFormat";
import { getTimeDifferenceString } from "../../Utils/Funcs/time";
import ImageGallery from "../../Utils/ImageComponents/ImageGallery";
import MediaPlayer from "../../Utils/VideoComponents/MediaPlayer";
import EmbedVideoComponent from "../../Utils/VideoComponents/EmbedVideoComponent";
import TwitchEmbedComponent from "../../Utils/VideoComponents/TwitchEmbedComponent";
import TwitterEmbedComponent from "../../Utils/VideoComponents/TwitterEmbedComponent";
import ImageOverlay from "../../Utils/ImageComponents/ImageOverlay";
import { useDispatch } from "react-redux";
import { fetchComments } from "../Comments/commentsSlice";
import './DetailedArticle.css'


function DetailedArticle( { article, onBackButtonClick } ) { 
    const dispatch = useDispatch();

    //Time utilities
    const navigatorDateFormat = formatDate(article.time)
    const date = new Date(article.time * 1000);
    const formattedISODate = date.toISOString();

    //Reddit Score
    const [articleScore, setArticleScore] = useState(article.score)
    const [isIncremented, setIsIncremented] = useState(false)
    const [isDecremented, setIsDecremented] = useState(false)
    

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

    function createImageElement(resolutions, title) {
        if (resolutions.length === 0) {
            return null
        }

        const srcSet = resolutions.map(resolution => `${resolution.url} ${resolution.width}w`).join(', ');

        const largestImage= resolutions.reduce((prev, current) => (prev.width > current.width) ? prev : current);

        return (
            <img src={largestImage.url} srcSet={srcSet} alt={title} sizes="(min-width: 1415px) 750px, (min-width: 768px) 50vw, 100vw" />
        );
    }

    let mediaToRender = null;
    if (article.media?.oembed?.type === 'video') {
       mediaToRender = <EmbedVideoComponent html={article.media.oembed.html}/>;
    } else if (article.media?.type === 'twitter.com') {
        mediaToRender = <TwitterEmbedComponent html={article.media.oembed.html}/>;
    } else if (article.media?.type === 'clips.twitch.tv' || article.media?.type === 'twitch.tv') {
        mediaToRender = <TwitchEmbedComponent html={article.media.oembed.html}/>;
    } else if (article.media?.reddit_video) {
        mediaToRender = <MediaPlayer media={article.media} playerId={article.id}  />;
    } else if (article.is_gallery){
        mediaToRender = <ImageGallery metadata={article.media_metadata} />
    } else if (article.image.source && article.image.resolutions){
        const imageElement = createImageElement(article.image.resolutions, article.title)
        mediaToRender = (
            <button onClick={() => handleOpenOverlay(imageElement)}>
                {imageElement}
            </button> 
        )
    } else if (article.url.includes("https://kick.com")){
        mediaToRender = <a href={article.url} title={article.title} >{article.url}</a>
    }

    const [commentClicked, setCommentClicked] = useState(false);
    const handleCommentClick = () => {
        setCommentClicked(!commentClicked);
        if (!commentClicked) {
            dispatch(fetchComments({subreddit: article.subreddit, articleId: article.id}));
        }
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
        <div className="article card">
            <div className="article-topbar">
                <button onClick={onBackButtonClick} className="back-button">Back</button>
                <div className="article-metadata">
                    <div className="article-subreddit-container">
                        <h4 className="article-subreddit">{article.subreddit}</h4>
                        <time dateTime={formattedISODate} title={navigatorDateFormat}>{getTimeDifferenceString(article.time)}</time>
                    </div>
                    <p className="article-topbar-paragraph">{article.author}</p>
                </div>
            </div>   
            <div className="article-wrapper">
                <div className="score">
                    <button className={upArrowClass} onClick={handleUpArrowClick}></button>
                    <p>{articleScore}</p>
                    <button className={downArrowClass} onClick={handleDownArrowClick}></button>
                </div>
                <div className="article-content">
                    <h2>{article.title}</h2>
                    <div className="media-wrapper">
                        {mediaToRender}
                        <ImageOverlay isOpen={isOverlayOpen} onClose={handleCloseOverlay}>
                            {overlayContent}
                        </ImageOverlay>
                    </div>
                    <ReactMarkdown>{article.paragraph}</ReactMarkdown>               
                </div>
            </div>  
            <button onClick={handleCommentClick} className="comments-button">Comments</button>          
            {commentClicked ? <Comments /> : null}
        </div>
    );
}

export default DetailedArticle;