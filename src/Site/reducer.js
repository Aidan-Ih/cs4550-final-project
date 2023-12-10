import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedInUser: null,
};

const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLoggedInUser: (state, action) => {
            state.loggedInUser = action.payload;
        },
    },
});

export const {setLoggedInUser} = slice.actions;
export default slice.reducer;
