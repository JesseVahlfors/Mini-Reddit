import React, {useEffect, useState} from "react";
import Comments from "../Comments/Comments";
import ImageOverlay from "../../Utils/ImageComponents/ImageOverlay";
import './DetailedArticle.css'
import { useImageOverlay } from "../../Utils/Hooks/useImageOverlay";
import MediaComponent from "../../Utils/Components/MediaComponent";
import ScoreComponent from "../../Utils/Components/ScoreComponent";
import MarkdownWithImages from "../../Utils/Components/MarkdownWithImages";
import MetadataComponent from "../../Utils/Components/MetadataComponent";

function DetailedArticle( { article, onBackButtonClick } ) { 
    //Image overlay
    const { isOverlayOpen, overlayContent, handleCloseOverlay } = useImageOverlay();

    //Comment handling
    const [commentClicked, setCommentClicked] = useState(false);
    const handleCommentClick = () => {
        setCommentClicked(!commentClicked);
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
                <MetadataComponent  article={article} />
            </div>   
            <div className="article-wrapper">
                <ScoreComponent article={article} />
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
            {commentClicked ? <Comments subreddit={article.subreddit} articleId={article.id} /> : null}
        </div>
    );
}

export default DetailedArticle;