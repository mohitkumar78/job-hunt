import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import authReducer from './auth.slice';
import jobReducer from './job.slice';
import companyReducer from './Company.slice';

// Persist Config
const persistConfig = {
    key: 'root',
    storage,
};

// Combine reducers
const rootReducer = combineReducers({
    auth: authReducer,
    job: jobReducer,
    company: companyReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Redux store with middleware to ignore non-serializable checks for persist actions
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
                // Ignore non-serializable data paths in the store
                ignoredPaths: ['register', 'rehydrate'],
            },
        }),
});

// Create a persistor
const persistor = persistStore(store);

export { store, persistor };
