import React from "react";
import { selectComments } from "./commentsSlice";
import { useSelector } from "react-redux";

import Comment from "./Comment";


function Comments() {  
    const comments = useSelector(selectComments)

    const renderComments = (commentsToRender, depth = 0) => {
        return commentsToRender
        .filter(comment => comment.text && comment.text.trim().length > 0) //filter empty comments
        .map((comment) => {
            return (
                <Comment key={comment.id} comment={comment} depth={depth} />
            );
        });
    };

    const sortedComments = comments.slice().sort((a,b) => b.score - a.score);
    
    return (
        <div className="comments" >
            {renderComments(sortedComments)}
        </div>
    )
}


export default Comments;

