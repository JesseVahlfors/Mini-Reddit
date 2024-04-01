import React, {useEffect, useState} from "react";
import Comments from "../Comments/Comments";
import './DetailedArticle.css'
import MarkdownWithImages from "../../Utils/Components/MarkdownWithImages";
import ArticleBase from "../ArticleBase/ArticleBase";
import HtmlComponent from "../../Utils/Components/HtmlComponent";


function DetailedArticle( { article, onBackButtonClick } ) { 
    const backButton =  (
        <button onClick={onBackButtonClick} className="back-button">
            Back
        </button>
    );

    //Comment handling
    const [commentClicked, setCommentClicked] = useState(false);
    const handleCommentClick = () => {
        setCommentClicked(!commentClicked);
    };

    // Jump back to the place of the article when returning 
    useEffect(() => {
        window.scrollTo(0, 0);

        return () => {
            const articleElement = document.getElementById(`article-${article.id}`);
            if (articleElement) {
                const topOffset = articleElement.offsetTop;
                window.scrollTo(0, topOffset); 
            }
        };
    }, [article.id]);

    useEffect(() => {
        if (commentClicked) {
            const commentSection = document.getElementById("comment-button");
            if (commentClicked) {
                commentSection.scrollIntoView({behavior: 'smooth'})
            }
        }
    }, [commentClicked]);

    return (
        <ArticleBase
            article={article}
            isDetailed={true}
            backButton={backButton}
        >         
            <HtmlComponent htmlContent={article.html} title={article.title} />               
            <button onClick={handleCommentClick} className="comments-button" id="comment-button">Comments</button>
            {commentClicked && <div className="comment-section">       
                <Comments subreddit={article.subreddit} articleId={article.id} />
            </div>}
        </ArticleBase>
    );
}

export default DetailedArticle;