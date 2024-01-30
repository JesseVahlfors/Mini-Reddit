import { mockThread } from "../../RedditApi/MockApi";
import { createSlice } from "@reduxjs/toolkit";

const initialState = mockThread.data.children.map((child) => {
    const image =
        child.data.preview &&
        child.data.preview.images &&
        child.data.preview.images.length > 0
            ? child.data.preview.images[0].source.url.replace(/&amp;/g, '&')
            : null;

    return {
        title: child.data.title,
        author: child.data.author,
        paragraph: child.data.selftext,
        image: image,
        subreddit: child.data.subreddit_name_prefixed,
        id: child.data.id,
        time: child.data.created_utc,
        score: child.data.score,
    };
});

export const articlesSlice = createSlice({
    name: 'articles',
    initialState: initialState,
    reducers: {
        dummyReducer: (state) => state,
    }
});
export const selectArticles = (state) => state.articles
export const { dummyReducer } = articlesSlice.actions;
export default articlesSlice.reducer;