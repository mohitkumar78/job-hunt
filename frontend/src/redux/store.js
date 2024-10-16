// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default storage for web
import { combineReducers } from 'redux';
import authReducer from './auth.slice';
import jobReducer from './job.slice';

// Persist Config
const persistConfig = {
    key: 'root',
    storage,
};

// Combine reducers
const rootReducer = combineReducers({
    auth: authReducer,
    job: jobReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Redux store
const store = configureStore({
    reducer: persistedReducer, // Use the persisted reducer
});

// Create a persistor
const persistor = persistStore(store); // Create a persistor

export { store, persistor }; // Export both store and persistor
