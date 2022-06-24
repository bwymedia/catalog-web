import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { cartReducer } from "./cart.slice";

const reducer = {
  cart: cartReducer,
};

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
