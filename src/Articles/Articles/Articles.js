import React, { useState } from "react";
import Article from "../Article/Article";
import { selectArticles } from "./articlesSlice";
import { useSelector } from "react-redux";
import DetailedArticle from "../DetailedArticle/DetailedArticle";

function Articles() {
    const articles = useSelector(selectArticles)
    const [selectedArticle, setSelectedArticle] = useState(null)

    const handleArticleClick = (article) => {
        setSelectedArticle(article);
    };

    const handleBackButtonClick = () => {
        setSelectedArticle(null);
    };
    
    return (
        <main className="articles">
            {selectedArticle ? (
                <DetailedArticle
                    article={selectedArticle}
                    onBackButtonClick={handleBackButtonClick}
                />
            ) : (
                articles.map((article) => (
                    <Article
                        article={article}
                        key={article.id}
                        onClick={() => handleArticleClick(article)} 
                    />
                )) 
            )}
        </main>
    );
};

export default Articles;