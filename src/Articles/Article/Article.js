import React from "react";
import { useState } from 'react';
import './Article.css'
import ArticleBase from "../ArticleBase/ArticleBase";
import HtmlComponent from "../../Utils/Components/HtmlComponent";


function Article( { article, onClick } ) { 
    // Article paragraph expansion
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = (event) => {
        event.stopPropagation()
        setIsExpanded(!isExpanded)
    };

    const hasMedia = article.media || article.media_metadata || article.image.source;

    const paragraph = hasMedia ? null : (
        <div 
            className={`paragraph-wrapper ${isExpanded ? 'expanded' : ''}`}
            onClick={toggleExpand}
        >
            <HtmlComponent htmlContent={article.html} title={article.title} />
        </div>
    );
    
    return (
        <ArticleBase
            article={article}
            isDetailed={false}
            onClick={onClick}
        >
            {paragraph}
        </ArticleBase>
    );
}

export default Article;
