import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

export const fetchArticles = createAsyncThunk("articles/fetchArticles", async () => {
    try {
        const response = await axios.get("https://www.reddit.com/r/Home.json?raw_json=1");
        return response.data.data.children.map((child) => {
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
                media: child.data.media,
                media_metadata: child.data.media_metadata,
            };
        });
    } catch (error) {
        console.error("Error fetching articles:", error);
        throw error;
    }
});

export const articlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticles.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(fetchArticles.pending, (state) => {
                //handle loading
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                //handle rejected
            });
    },
});

export const selectArticles = (state) => state.articles
export default articlesSlice.reducer;