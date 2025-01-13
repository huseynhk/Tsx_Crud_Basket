import { combineReducers } from "@reduxjs/toolkit";
import products from "../slices/productSlice";

const rootReducer = combineReducers({
  products,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
