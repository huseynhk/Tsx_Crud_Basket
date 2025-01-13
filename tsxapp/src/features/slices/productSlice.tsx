import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../features/app/rootReducer";
import { BasketType, ProductState } from "../../interfaces/data";
import { toast } from "react-toastify";

const initialState: ProductState = {
  basket: [],
  amount: 0,
  totalAmount: 0,
  totalPrice: 0,
  totalDiscountPrice: 0,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<BasketType>) => {
      const exist = state.basket.find(
        (product) => product.id === action.payload.id
      );
      if (exist) {
        toast.info("Product is already in the cart", {
          autoClose: 1000,
        });
        if (exist.amount >= action.payload.stock) {
          toast.warn("Maximum stock reached for this product!", {
            autoClose: 1000,
          });
          return;
        }
      } else {
        if (action.payload.stock === 0) {
          toast.warn("This product is out of stock!", {
            autoClose: 1000,
          });
          return;
        }
        state.basket.push(action.payload);
        state.totalAmount++;
        state.totalPrice += action.payload.price;
        state.totalDiscountPrice += action.payload.discountPrice;
        toast.success("Product added successfully!", {
          autoClose: 1000,
        });
      }
    },

    removeFromCart: (state, action: PayloadAction<BasketType>) => {
      const exist = state.basket.find(
        (product) => product.id === action.payload.id
      );
      if (exist) {
        state.basket = state.basket.filter(
          (product) => product.id !== action.payload.id
        );
        toast.success("Product deleted successfully!", {
          autoClose: 1000,
        });
        state.totalAmount -= exist.amount;
        state.totalPrice -= exist.totalPrice;
        state.totalDiscountPrice -= exist.totalDiscountPrice;
      }
    },

    increament: (state, action: PayloadAction<BasketType>) => {
      const exist = state.basket.find(
        (product) => product.id === action.payload.id
      );
      if (exist) {
        if (exist.amount >= action.payload.stock) {
          toast.warn("Maximum stock reached for this product!", {
            autoClose: 1000,
          });
          return;
        }
        exist.amount++;
        exist.totalAmount++;
        exist.totalPrice += exist.price;
        exist.totalDiscountPrice += exist.discountPrice;
        state.totalAmount++;
        state.totalPrice += exist.price;
        state.totalDiscountPrice += exist.discountPrice;
      }
    },

    decrement: (state, action: PayloadAction<BasketType>) => {
      const exist = state.basket.find(
        (product) => product.id === action.payload.id
      );
      if (exist && exist.amount > 1) {
        exist.amount--;
        exist.totalAmount--;
        exist.totalPrice -= exist.price;
        exist.totalDiscountPrice -= exist.discountPrice;
        state.totalAmount--;
        state.totalPrice -= exist.price;
        state.totalDiscountPrice -= exist.discountPrice;
      }
    },

    clearBasket: (state) => {
      state.basket = [];
      state.totalAmount = 0;
      state.totalPrice = 0;
      state.totalDiscountPrice = 0;
    },
  },
});

export const getBasket = (state: RootState) => state.products.basket;
export const getTotalPrice = (state: RootState) => state.products.totalPrice;
export const getTotalDiscount = (state: RootState) =>
  state.products.totalDiscountPrice;
export const getTotalAmount = (state: RootState) => state.products.totalAmount;
export const { addToCart, removeFromCart, increament, decrement, clearBasket } =
  productSlice.actions;
export default productSlice.reducer;
