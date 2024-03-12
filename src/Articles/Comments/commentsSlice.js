import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchComments = createAsyncThunk("comments/fetchComments", async ({subreddit, articleId}) => {
    try {
        const response = await axios.get(`https://www.reddit.com/${subreddit}/comments/${articleId}.json?raw_json=1`);
        const comments = response.data[1].data.children
        .filter((child) => child.kind === "t1")
        .map((child) => {
            return {
                author: child.data.author,
                subreddit: child.data.subreddit_name_prefixed,
                id: child.data.id,
                text: child.data.body,
                score: child.data.score,
                time: child.data.created_utc,
            };
        });

        return comments;
    } catch (error) {
        console.error("error fetching artilces:", error);
        throw error;
    }
})

export const commentsSlice = createSlice({
    name: 'comments',
    initialState: { data: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(fetchComments.pending, (state) => {
                //handle loading
            })
            .addCase(fetchComments.rejected, (state, action) => {
                //handle rejected
            })
    },
});

export const selectComments = (state) => state.comments.data
export default commentsSlice.reducer;