import React from "react";
import { mockThread } from "../../RedditApi/MockApi";

const title = mockThread.data.children[1].data.title

function Comment() {
    return (
        <div className="comment">
            <p></p>
        </div>
    );
}

export default Comment;