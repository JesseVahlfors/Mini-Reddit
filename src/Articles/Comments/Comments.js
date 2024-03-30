import React, { useEffect } from "react";
import { fetchComments ,selectComments } from "./commentsSlice";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./Comment";


function Comments({ subreddit, articleId }) {  
    const dispatch = useDispatch();
    const comments = useSelector(selectComments)
    const isLoading = useSelector(state => state.comments.isLoading)
    const error = useSelector(state => state.comments.error);

    useEffect(() => {
        dispatch(fetchComments({ subreddit, articleId }));
    }, [dispatch, subreddit, articleId]);

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
    
    if (isLoading) return <div>Loading comments...</div>;
    if (error) return <div>Error fetching comment: {error}</div>;

    return (
        <div className="comments" >
            {renderComments(sortedComments)}
        </div>
    )
}


export default Comments;

