import React, { useEffect, useState } from "react";
import Article from "../Article/Article";
import { fetchArticles, selectArticles } from "./articlesSlice";
import { useDispatch, useSelector } from "react-redux";
import DetailedArticle from "../DetailedArticle/DetailedArticle";
import { selectSelectedSubreddit } from "../../Sidebar/Subreddit/subredditSlice";
import "./Articles.css"

function Articles() {
    const dispatch = useDispatch();
    const articles = useSelector(selectArticles);
    const selectedSubreddit = useSelector(selectSelectedSubreddit)
    const [selectedArticle, setSelectedArticle] = useState(null)

    useEffect(() => {
        const SubredditToRender = selectedSubreddit ? selectedSubreddit.displayName : "Popular";
        dispatch(fetchArticles({ subreddit: SubredditToRender, query: "" }));
      }, [dispatch, selectedSubreddit]);
      
    const handleArticleClick = (article) => {
        setSelectedArticle(article);
    };

    const handleBackButtonClick = () => {
        setSelectedArticle(null);
    };
    
    const hasNoArticles = !articles || articles.length === 0;


    return (
        <main className="articles">
            {selectedArticle ? (
                <DetailedArticle
                    article={selectedArticle}
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