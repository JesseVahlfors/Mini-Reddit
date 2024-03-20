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
            const imageSource =
            child.data.preview &&
            child.data.preview.images &&
            child.data.preview.images.length > 0
            ? child.data.preview.images[0].source.url.replace(/&amp;/g, '&')
            : null;

            const imageResolutions =
            child.data.preview &&
            child.data.preview.images &&
            child.data.preview.images.length > 0
            ? child.data.preview.images[0].resolutions.map(resolution => ({
                url: resolution.url.replace(/&amp;/g, '&'),
                width: resolution.width,
                height: resolution.height,
            }))
            : [];

            return {
                title: child.data.title,
                author: child.data.author,
                paragraph: child.data.selftext,
                image: {
                    source: imageSource,
                    resolutions: imageResolutions,
                },
                subreddit: child.data.subreddit_name_prefixed,
                id: child.data.id,
                time: child.data.created_utc,
                score: child.data.score,
                media: child.data.media,
                media_metadata: child.data.media_metadata,
                url: child.data.url
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

export const articlesSlice = createSlice({
    name: 'articles',
    initialState: { data: [] },
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