import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../Profile/profileReducer";


const store = configureStore({
    reducer: {
        profileReducer
    }
});


export default store;