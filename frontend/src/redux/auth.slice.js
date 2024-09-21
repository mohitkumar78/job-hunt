import { createSlice } from '@reduxjs/toolkit';

// Correct the spelling of initialState
const initialState = {
    name: "",
    email: "",
    isAuthenticated: false
}

const authSlice = createSlice({
    name: "auth",
    initialState, // Correct property name
    reducers: {
        login: (state, action) => {
            console.log(action.payload.fullname)
            console.log(action.payload.email)
            console.log(action.payload.isAuthenticated)
            state.name = action.payload.fullname;
            state.email = action.payload.email; // Should refer to `action.payload.email`, not `name`
            state.isAuthenticated = action.payload.isAuthenticated;
        },
        logout: (state) => {
            state.name = "";
            state.email = "";
            state.isAuthenticated = false;
        }
    }
});

// Exporting the actions
export const { login, logout } = authSlice.actions;

// Exporting the reducer (singular)
export default authSlice.reducer;
