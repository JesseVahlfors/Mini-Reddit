import { createSlice } from "@reduxjs/toolkit";

export const mediaPlayerSlice = createSlice({
    name: 'video',
    initialState: {
        activePlayer: null,
    },
    reducers: {
        setActivePlayer: (state, action) => {
            state.activePlayer = action.payload;
        },
    },
});

export const { setActivePlayer } = mediaPlayerSlice.actions;

export default mediaPlayerSlice.reducer;