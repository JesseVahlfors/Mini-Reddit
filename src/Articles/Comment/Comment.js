import React from "react";
import { mockThread } from "../../RedditApi/MockApi";
import { yes } from "../../RedditApi/MockApi";

const title = mockThread.data.children[1].data.title;
const post = mockThread.data.children[1].data.selftext;
const image = mockThread.data.children[1].data.url;

function Comment() {
    return (
        <div className="comment">
            <h2>{title}</h2>
            <p>{post}</p>
            <img src={image}></img>
        </div>
    );
}

export default Comment;