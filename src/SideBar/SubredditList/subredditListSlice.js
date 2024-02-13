import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = []


export const fetchSubreddits  = createAsyncThunk("subreddits/fetchSubreddits", async () => {
    try {
        const response = await axios.get(`https://www.reddit.com/subreddits/popular.json?raw_json=1`);
        return response.data.data.children.map((child) => {
                return {
                    title: child.data.title,
                    url: child.data.url,
                    communityIcon: child.data.community_icon,
                    id: child.data.id,
                    iconImg: child.data.icon_img,
                    displayName: child.data.display_name,
                    displayNamePrefixed: child.data.display_name_prefixed, 
                }
            });
    } catch(error) {
        console.error("Error fetching subreddits:", error);
        throw error;
    }
});




export const subredditListSlice = createSlice({
    name: "subreddits",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchSubreddits.fulfilled, (state, action) => {
            return action.payload;
        })
        .addCase(fetchSubreddits.pending, (state) => {
            //loading
        })
        .addCase(fetchSubreddits.rejected, (state, action) => {
            //handle reject
        });
    },
});

export const selectSubreddits = (state) => state.subreddits;
export default subredditListSlice.reducer;