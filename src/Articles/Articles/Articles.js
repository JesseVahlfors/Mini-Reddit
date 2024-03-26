import React, { useEffect, useState } from "react";
import Article from "../Article/Article";
import { clearCurrentArticle, fetchArticles, selectArticles, selectCurrentArticle, setCurrentArticle } from "./articlesSlice";
import { useDispatch, useSelector } from "react-redux";
import DetailedArticle from "../DetailedArticle/DetailedArticle";
import { selectSelectedSubreddit } from "../../Sidebar/Subreddit/subredditSlice";
import "./Articles.css"

function Articles() {
    const dispatch = useDispatch();
    const articles = useSelector(selectArticles);
    const currentArticle = useSelector(selectCurrentArticle);
    const selectedSubreddit = useSelector(selectSelectedSubreddit);
    

    useEffect(() => {
        const SubredditToRender = selectedSubreddit ? selectedSubreddit.displayName : "Popular";
        dispatch(fetchArticles({ subreddit: SubredditToRender, query: "" }));
      }, [dispatch, selectedSubreddit]);
      
    const handleArticleClick = (article) => {
        dispatch(setCurrentArticle(article))
    };

    const handleBackButtonClick = () => {
        dispatch(clearCurrentArticle())
    };
    
    const hasNoArticles = !articles || articles.length === 0;


    return (
        <main className="articles">
            {currentArticle ? (
                <DetailedArticle
                    article={currentArticle}
                    onBackButtonClick={handleBackButtonClick}
                />
            ) : hasNoArticles ? (
                <div className="no-results card">We could not find any results</div>
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