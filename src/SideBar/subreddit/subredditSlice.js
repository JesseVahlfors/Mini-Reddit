import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedSubreddit: null,
}

const subredditSlice = createSlice({
    name: 'subreddit',
    initialState,
    reducers: {
        selectSubreddit: (state, action) => {
            state.selectedSubreddit = action.payload;
        },
    },
});

export const { selectSubreddit } = subredditSlice.actions;
export const selectSelectedSubreddit = (state) => state.subreddit.selectedSubreddit;

export default subredditSlice.reducer;