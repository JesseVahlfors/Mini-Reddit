import { mockComments } from "../../RedditApi/MockComments";
import { createSlice } from "@reduxjs/toolkit";

export const initialState = mockComments[1].data.children.map((child) => {
    return {
        author: child.data.author,
        subreddit: child.data.subreddit_name_prefixed,
        id: child.data.id,
        text: child.data.body,
        score: child.data.score,
        time: child.data.created_utc,
    };
    
});

export const commentsSlice = createSlice({
    name: 'comments',
    initialState: initialState,
    reducers: {
        dummyReducer: (state) => state,
    }
});
export const selectComments = (state) => state.comments
export const { dummyReducer } = commentsSlice.actions;
export default commentsSlice.reducer;