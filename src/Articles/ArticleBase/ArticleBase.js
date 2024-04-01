import React from "react";
import { useImageOverlay } from "../../Utils/Hooks/useImageOverlay";
import MediaComponent from "../../Utils/Components/MediaComponent";
import ImageOverlay from "../../Utils/ImageComponents/ImageOverlay";
import ScoreComponent from "../../Utils/Components/ScoreComponent";
import MetadataComponent from "../../Utils/Components/MetadataComponent";


function ArticleBase({ article, onClick, isDetailed = false, backButton, children }) {
    //Image overlay
    const { isOverlayOpen, overlayContent, handleCloseOverlay, handleOpenOverlay } = useImageOverlay();
     //Prevent selecting article with image
    const handleImageClick = (event) => {
       event.stopPropagation()
    }

    return (
        <div className="article card" id={`article-${article.id}`} onClick={!isDetailed? onClick : undefined}>
            {backButton}
            <MetadataComponent article={article} /> 
            <div className="article-wrapper">
                <ScoreComponent article={article} />
                <div className="article-content" onClick={onClick}>
                    <h2>{article.title}</h2>
                    <div className="media-wrapper" onClick={handleImageClick}>
                        <MediaComponent article={article} handleOpenOverlay={handleOpenOverlay}/>
                        <ImageOverlay isOpen={isOverlayOpen} onClose={handleCloseOverlay} imageData={overlayContent}/>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ArticleBase;