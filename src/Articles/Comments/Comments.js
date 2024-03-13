import React from "react";
import { selectComments } from "./commentsSlice";
import { getTimeDifferenceString } from "../../Utils/Funcs/time";
import { useSelector } from "react-redux";
import { formatDate } from "../../Utils/Funcs/timeFormat";


function Comments() {  
    const comments = useSelector(selectComments)
    const sortedComments = comments.slice().sort((a,b) => b.score - a.score);
    return (
        <div className="comments" >
            {sortedComments.map(comment => (
                <div className="comment" id={comment.id} key={comment.id}>
                    <p>{comment.score}</p>
                    <p>{comment.text}</p>
                    <div className="comment-metadata">
                        <p>{comment.author}</p>
                        {comment.time && <time dateTime={new Date(comment.time * 1000).toISOString()} title={formatDate(new Date(comment.time * 1000))}>{getTimeDifferenceString(comment.time)}</time>}
                    </div> 
                </div>
            ))}
        </div>
    )
}

export default Comments;

