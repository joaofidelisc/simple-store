import { configureStore } from '@reduxjs/toolkit';
import shoppingCartReducer, { updateTotalPrice } from './slices/shoppingCartSlice.js';
import userReducer from './slices/userSlice.js';

import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';

const persistConfig = {
  key: "root",
  storage
};

const reducer = combineReducers({
  shoppingCart: shoppingCartReducer,
  user: userReducer
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
