import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth.slice';
import jobReducer from './job.slice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        job: jobReducer
    }
});

export default store;
