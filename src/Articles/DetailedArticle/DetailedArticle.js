import React, {useEffect, useState} from "react";
import Comments from "../Comments/Comments";
import ReactMarkdown from 'react-markdown'
import ImageOverlay from "../../Utils/ImageComponents/ImageOverlay";
import { useDispatch } from "react-redux";
import { fetchComments } from "../Comments/commentsSlice";
import './DetailedArticle.css'
import { useImageOverlay } from "../../Utils/Hooks/useImageOverlay";
import MediaComponent from "../../Utils/Components/MediaComponent";
import TimeAgo from "../../Utils/Components/TimeAgo";
import { useRedditScore } from "../../Utils/Hooks/useRedditScore";
import MarkdownWithImages from "../../Utils/Components/MarkdownWithImages";


function DetailedArticle( { article, onBackButtonClick } ) { 
    const dispatch = useDispatch();


    //Reddit Score
    const { score,
        incrementScore,
        decrementScore,
        isIncremented,
        isDecremented
       } = useRedditScore(article.score);

    const handleUpArrowClick = (event) => {
        event.stopPropagation();
        incrementScore()
    }

    const handleDownArrowClick = (event) => {
        event.stopPropagation();
        decrementScore();
    }

    const upArrowClass = `up arrow ${isIncremented ? 'green-arrow' : ''}`;
    const downArrowClass = `down arrow ${isDecremented ? 'green-arrow' : ''}`

    //Image overlay
    const { isOverlayOpen, overlayContent, handleCloseOverlay } = useImageOverlay();

    //Comment handling
    const [commentClicked, setCommentClicked] = useState(false);
    const handleCommentClick = () => {
        setCommentClicked(!commentClicked);
        if (!commentClicked) {
            dispatch(fetchComments({subreddit: article.subreddit, articleId: article.id}));
        }
    };

    // Jump back to the place of the article when returning 
    useEffect(() => {
        window.scrollTo(0, 0);

        return () => {
            const articleElement = document.getElementById(`article-${article.id}`);
            if (articleElement) {
                const topOffset = articleElement.offsetTop;
                window.scrollTo(0, topOffset);
            }
        };
    }, [article.id]);

    
    
    return (
        <div className="article card">
            <div className="article-topbar">
                <button onClick={onBackButtonClick} className="back-button">Back</button>
                <div className="article-metadata">
                    <div className="article-subreddit-container">
                        <h4 className="article-subreddit">{article.subreddit}</h4>
                        <TimeAgo timestamp={article.time}/>
                    </div>
                    <p className="article-topbar-paragraph">{article.author}</p>
                </div>
            </div>   
            <div className="article-wrapper">
                <div className="score">
                    <button className={upArrowClass} onClick={handleUpArrowClick}></button>
                    <p>{score}</p>
                    <button className={downArrowClass} onClick={handleDownArrowClick}></button>
                </div>
                <div className="article-content">
                    <h2>{article.title}</h2>
                    <div className="media-wrapper">
                        <MediaComponent article={article}/>
                        <ImageOverlay isOpen={isOverlayOpen} onClose={handleCloseOverlay}>
                            {overlayContent}
                        </ImageOverlay>
                    </div>
                    <MarkdownWithImages markdownText={article.paragraph}/>               
                </div>
            </div>  
            <button onClick={handleCommentClick} className="comments-button">Comments</button>          
            {commentClicked ? <Comments /> : null}
        </div>
    );
}

export default DetailedArticle;