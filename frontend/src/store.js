import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import postsReducer from './slices/postsSlice';
import usersReducer from './slices/usersSlice';
import {apiSlice} from './slices/apiSlice';

const store=configureStore({
    reducer:{
        auth: authReducer,
        posts: postsReducer,
        users: usersReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleWare)=> getDefaultMiddleWare().concat(apiSlice.middleware),
    devTools: true
});

export default store;