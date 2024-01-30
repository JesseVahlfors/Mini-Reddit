import React from "react";
import { selectComments } from "./commentsSlice";
import { getTimeDifferenceString } from "../../Utils/Funcs/time";
import { useSelector } from "react-redux";
import { formatDate } from "../../Utils/Funcs/timeFormat";


function Comments() {
    const comments = useSelector(selectComments)
    const sortedComments = comments.slice().sort((a,b) => b.score - a.score);
    return (
        <div className="comments">
            {sortedComments.map(comment => (
                <div className="comment" id={comment.id}>
                    <p>{comment.text}</p>
                    <div>
                        <button>up</button>
                        <p>{comment.score}</p>
                        <button>down</button>
                    </div>
                    <p>{comment.author}</p>
                    <time dateTime={new Date(comment.time * 1000).toISOString()} title={formatDate(comment.time)}>{getTimeDifferenceString(comment.time)}</time> 
                </div>
            ))}
        </div>
    )
}

export default Comments;

