import { mockComments } from "../../RedditApi/MockComments";
import { createSlice } from "@reduxjs/toolkit";

export const initialState = mockComments[1].data.children.map((child) => {
    return {
        author: child.data.author,
        subreddit: child.data.subreddit_name_prefixed,
        id: child.data.id,
        text: child.data.body,
        downs: child.data.downs,
        ups: child.data.ups,
    };
    
});

export const commentsSlice = createSlice({
    name: 'comments',
    initialState: initialState,
    reducers: {
        dummyReducer: (state) => state,
    }
});
export const selectArticles = (state) => state.articles
export const { dummyReducer } = commentsSlice.actions;
export default commentsSlice.reducer;