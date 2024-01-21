import React from "react";
import Comment from "../Comment/Comment";

function Article( { article } ) {
    return (
        <div className="article">
            <h2>{article.title}</h2>
            <p>{article.paragraph}</p>
            <img src={article.image}></img>
            <Comment/>
        </div>
    );
}

export default Article;
