import React, { useState } from "react";
import { getTimeDifferenceString } from "../../Utils/Funcs/time";
import { formatDate } from "../../Utils/Funcs/timeFormat";

const Comment = ({ comment, depth }) => {
    const [showReplies, setShowReplies] = useState(false);
    const repliesWithContent = comment.replies.filter(reply => reply.text && reply.text.trim().length > 0)
    const sortedReplies = repliesWithContent.slice().sort((a,b) => b.score - a.score);
    const replyToRender = () => { 
        if(showReplies) {
            return "Hide Replies";
        } else if(sortedReplies.length > 1) {
            return `${sortedReplies.length} replies`;
        } else {
            return "1 reply";
        };
    }

    return (
        <div className="comment-container">
            <div className={`comment depth-${depth}`}>
                <p>{comment.score}</p>
                <p>{comment.text}</p>
                <div className="comment-metadata">
                    <p>{comment.author}</p>
                    {comment.time && (
                        <time
                            dateTime={new Date(comment.time * 1000).toISOString()}
                            title={formatDate(new Date(comment.time * 1000))}
                        >
                            {getTimeDifferenceString(comment.time)}
                        </time>
                    )}
                </div>
            </div>
                {sortedReplies && sortedReplies.length > 0 && (
                    <>
                        <button onClick={() => setShowReplies(!showReplies)}>
                            {replyToRender()}
                        </button>
                        {showReplies && (
                            <div className="replies">
                                {sortedReplies
                                .map((reply) => (
                                    <Comment key={reply.id} comment={reply} depth={depth + 1} />
                                ))}
                            </div>
                        )}
                    </>
                )}
        </div>
    );
};

export default Comment;