import React from "react";
import Article from "../Article/Article";
import { selectArticles } from "./articlesSlice";
import { useSelector } from "react-redux";

function Articles() {

    const articles = useSelector(selectArticles)
    
    return (
        <div className="articles">
            <p>Articles</p>
            { articles.map(article => <Article  article={article} key={article.id} />) }
        </div>
    );
}

export default Articles;