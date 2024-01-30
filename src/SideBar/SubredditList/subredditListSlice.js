import { createSlice } from "@reduxjs/toolkit";
import { mockSubreddits } from "../../RedditApi/MockSubreddits";

const initialState = mockSubreddits.data.children.map((child) => {
    return {
        title: child.data.title,
        url: child.data.url,
        communityIcon: child.data.community_icon,
        id: child.data.id,
    }
});

export const subredditListSlice = createSlice({
    name: "subreddits",
    initialState: initialState,
    reducers: {
        dummyReducer: (state) => state,
    }
});

export const selectSubreddits = (state) = state.articles;
export const { dummyReducer } = subredditListSlice.actions;
export default subredditListSlice.reducer;