import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productsReducer from "./features/productsSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  products: productsReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["products"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
