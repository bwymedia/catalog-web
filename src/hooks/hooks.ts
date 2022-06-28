import { TypedUseSelectorHook, useSelector, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";

export const useAppDispatch = () => useSelector<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
