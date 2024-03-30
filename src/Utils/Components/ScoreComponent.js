import React from "react";
import { useRedditScore } from "../Hooks/useRedditScore";

function ScoreComponent({article}) {

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
    
    return (
        <div className="score">
            <button className={upArrowClass} onClick={handleUpArrowClick}></button>
            <p>{score}</p>
            <button className={downArrowClass} onClick={handleDownArrowClick}></button>
        </div>
    );
};

export default ScoreComponent;