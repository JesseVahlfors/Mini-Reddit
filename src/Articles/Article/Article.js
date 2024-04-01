import React from "react";
import { useState } from 'react';
import './Article.css'
import MarkdownWithImages from "../../Utils/Components/MarkdownWithImages";
import ArticleBase from "../ArticleBase/ArticleBase";


function Article( { article, onClick } ) { 
    // Article paragraph expansion
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = (event) => {
        event.stopPropagation()
        setIsExpanded(!isExpanded)
    };

    const paragraph = 
    <div 
    className={`paragraph-wrapper ${isExpanded ? 'expanded' : ''}`}
    onClick={toggleExpand}
    >
       <MarkdownWithImages markdownText={article.paragraph}/>
    </div>
    
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
