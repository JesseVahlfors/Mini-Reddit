import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedSubreddit: {
        type: 'subreddit/selectSubreddit',
        payload: {
          title: 'Home',
          url: '/r/Home/',
          communityIcon: '',
          id: '2qs0k',
          iconImg: '',
          displayName: 'Home',
          displayNamePrefixed: 'r/Home'
        }
      },
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