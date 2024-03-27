import { useState } from "react";
  
export function useRedditScore (initialScore) {
    const [score, setScore] = useState(initialScore);
    const [isIncremented, setIsIncremented] = useState(false);
    const [isDecremented, setIsDecremented] = useState(false);
    
    const incrementScore = () => {
        if(isIncremented) {
        setScore(score -1);
       } else {
        if (isDecremented) {
            setScore(score +2);
            setIsDecremented(false);
        } else {
            setScore(score +1);
        }
       }
       setIsIncremented(!isIncremented);
    };

    const decrementScore = () => {
        if(isDecremented) {
            setScore(score +1);
       } else {
            if (isIncremented) {
                setScore(score -2);

                setIsIncremented(false);
            } else {
                setScore(score -1);
            }
       }
       setIsDecremented(!isDecremented);
    };

    return {
        score,
        incrementScore,
        decrementScore,
        isIncremented,
        isDecremented
    };
}