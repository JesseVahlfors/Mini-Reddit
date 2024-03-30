import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const processComments= (children) => {
    return children
        .filter((child) => child.kind === "t1"|| child.kind === "more")
        .map((child) => {
            const comment = {
                author: child.data.author,
                subreddit: child.data.subreddit_name_prefixed,
                id: child.data.id,
                text: child.data.body,
                score: child.data.score,
                time: child.data.created_utc,
            };

            if (child.data.replies && typeof child.data.replies === 'object') {
                comment.replies = processComments(child.data.replies.data.children);
            } else {
                comment.replies = [];
            }

            return comment;
        })
}

export const fetchComments = createAsyncThunk("comments/fetchComments", async ({subreddit, articleId}) => {
    try {
        const response = await axios.get(`https://www.reddit.com/${subreddit}/comments/${articleId}.json?raw_json=1`);
        const comments = processComments(response.data[1].data.children);

        return comments;
    } catch (error) {
        console.error("error fetching comments:", error);
        throw error;
    }
})

export const commentsSlice = createSlice({
    name: 'comments',
    initialState: { 
        data: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchComments.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to fetch comments';
            })
    },
});

export const selectComments = (state) => state.comments.data
export default commentsSlice.reducer;