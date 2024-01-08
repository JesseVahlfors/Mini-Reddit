import React from "react";
import Comment from "../Comment/Comment";
import PostCard from "../PostCard/PostCard";

function Article() {
    return (
        <div className="article">
            <p >Article</p>
            <PostCard/>
            <Comment/>
        </div>
    );
}

export default Article;