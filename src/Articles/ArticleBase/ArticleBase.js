import React from "react";
import { useRedditScore } from "../../Utils/Hooks/useRedditScore";

function ArticleBase({ article, onClick, isDetailed = false }) {
    const {
        score,
        incrementScore,
        decrementScore,
        isIncremented,
        isDecremented
    } = useRedditScore(article.score)

    const handleDownArrowClick = (event) => {
        event.stopPropagation();
        decrementScore(article.score)
    }

    const handleUpArrowClick = (event) => {
        event.stopPropagation();
        incrementScore(article.score)
    }

    return (
        <div className="article card" id={`article-${article.id}`} onClick={!isDetailed? onClick : undefined}>
            
            {!isDetailed && (

            )}
            {isDetailed && (

            )}
        </div>
    )
}