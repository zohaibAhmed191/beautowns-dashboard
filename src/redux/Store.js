import { configureStore } from "@reduxjs/toolkit";
import userReducers from "./slices/userSlice";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import storage from 'redux-persist/lib/storage'

const reducers = combineReducers({
  user: userReducers,
});
const persistConfig = {
  key: "user",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);
export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
