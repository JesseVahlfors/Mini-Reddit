import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const articleCache = {};

export const fetchArticles = createAsyncThunk("articles/fetchArticles", async (subreddit) => {
    if (articleCache[subreddit]) {
        return articleCache[subreddit].data;
    }
    try {
        const response = await axios.get(`https://www.reddit.com/r/${subreddit}.json?raw_json=1`);
        const articles = response.data.data.children.map((child) => {
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
        
        articleCache[subreddit] = {
            data: articles,
        };
        
        return articles;
    } catch (error) {
        if(articleCache[subreddit]) {
            console.warn(`Request failed for ${subreddit}. Using cached data.`)
            return articleCache[subreddit].data;
        }
        console.error("Error fetching articles:", error);
        throw error;
    }
});

const initialState = {
    data: [],
};

export const articlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.data =  action.payload;
            })
            .addCase(fetchArticles.pending, (state) => {
                //handle loading
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                //handle rejected
            });
    },
});

export const selectArticles = (state) => state.articles.data
export default articlesSlice.reducer;