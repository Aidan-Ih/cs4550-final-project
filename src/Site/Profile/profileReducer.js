import { createSlice } from "@reduxjs/toolkit";
import db from "../db";

const users = db.users;
const user = users.find((u) => u.loggedIn);
const initialState = {
    users: users,
    user: user
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        updateProfile: (state, action) => {
            state.users = state.users.map((user) => {
                if (user._id === action.payload._id) {
                    return action.payload;
                } else {
                    return user;
                }
            });
        },
        setProfile: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { updateProfile, setProfile } = profileSlice.actions;
export default profileSlice.reducer;