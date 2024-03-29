import { createSlice } from "@reduxjs/toolkit";
import { mockSubreddits } from "../../RedditApi/MockSubreddits";

const initialState = mockSubreddits.data.children.map((child) => {
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

export const subredditListSliceMock = createSlice({
    name: "subreddits",
    initialState: initialState,
    reducers: {
        dummyReducer: (state) => state,
    }
});

export const selectSubreddits = (state) => state.subreddits;
export const { dummyReducer } = subredditListSliceMock.actions;
export default subredditListSliceMock.reducer;