import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth.slice'; // Import the auth reducer

// Create the store
const store = configureStore({
    reducer: {
        auth: authReducer, // Add your auth slice reducer here
    },
});

export default store;
