import { createSlice } from "@reduxjs/toolkit";
// import type { Product } from "../../types/product";

export interface ProductsState {
  products: {};
}

const initialState: ProductsState = {
  products: {},
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});
