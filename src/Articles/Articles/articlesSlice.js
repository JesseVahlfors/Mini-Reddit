import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const articleCache = {};

export const fetchArticles = createAsyncThunk(
    "articles/fetchArticles",
    async ({subreddit, query=''}, {rejectWithValue}) => {
    if (!query && articleCache[subreddit]) {
        return articleCache[subreddit].data;
    }

    let url = `https://www.reddit.com/r/${subreddit}/${query ? 'search.json?q=' + query + '&restrict_sr=1&' : '.json'}?raw_json=1`;
    try {
        const response = await axios.get(url);
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
                url: child.data.url,
                is_gallery: child.data.is_gallery,
            };
        });
        
        if (!query) {
        articleCache[subreddit] = { data: articles };
        }

        return articles;
    } catch (error) {
        console.error("Error fetching articles or search results:", error);
        return rejectWithValue('Failed to fetch articles or search results')
    }
});

export const articlesSlice = createSlice({
    name: 'articles',
    initialState: { 
        data: [],
        currentArticle: null,
        isOverlayOpen: false,
        overlayContent: null,
    },
    reducers: {
        setCurrentArticle: (state, action) => {
            state.currentArticle = action.payload;
        },
        clearCurrentArticle: (state) => {
            state.currentArticle = null;
        },
        setOpenOverlay: (state, action) => {
            state.isOverlayOpen = true;
            state.overlayContent = action.payload;
        },
        closeOverlay: (state) => {
            state.isOverlayOpen = false;
            state.overlayContent = null;
        },
    },
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

export const {setOpenOverlay, closeOverlay} = articlesSlice.actions
export const { setCurrentArticle, clearCurrentArticle } = articlesSlice.actions;
export const selectIsOverlayOpen = (state) => state.articles.isOverlayOpen;
export const selectOverlayContent = (state) => state.articles.overlayContent;
export const selectCurrentArticle = (state) => state.articles.currentArticle;
export const selectArticles = (state) => state.articles.data;
export default articlesSlice.reducer;