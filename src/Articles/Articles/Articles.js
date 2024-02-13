import React, { useEffect, useState } from "react";
import Article from "../Article/Article";
import { fetchArticles, selectArticles } from "./articlesSlice";
import { useDispatch, useSelector } from "react-redux";
import DetailedArticle from "../DetailedArticle/DetailedArticle";

function Articles() {
    const dispatch = useDispatch();
    const articles = useSelector(selectArticles);
    const [selectedArticle, setSelectedArticle] = useState(null)

    useEffect(() => {
        dispatch(fetchArticles());
    }, [dispatch]);

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