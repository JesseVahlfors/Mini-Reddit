import React from "react";
import Article from "../Article/Article";
import { mockThread } from "../../RedditApi/MockApi";
import { initialState } from "./articleSlice";

console.log(`this is the initialState: ${initialState}`) 

function Articles() {
    return (
        <div className="articles">
            <p >Articles</p>
            {<Article/>}
        </div>
    );
}

export default Articles;