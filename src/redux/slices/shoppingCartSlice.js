import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    addedProducts: [],
    totalPrice: 0,
    appliedCoupons: [],
    discountGranted: 0,
    couponsAvailable: ['TECH', '15OFF'],
};

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addProduct(state, action) {
      const product = action.payload;
      const productExists = state.addedProducts.find((p) => p.id === product.id && p.userEmail == product.userEmail);
      if (!productExists){
        state.addedProducts.push({
          title: product.title,
          imgsrc: product.imgsrc,
          description: product.description,
          standardPrice: product.standardPrice,
          priceUpdated: product.standardPrice,
          category: product.category,
          id: product.id,
          quantity: 1,
          userEmail: product.userEmail
        });
        state.totalPrice = (state.discountGranted>0 ? state.discountGranted : 1) * state.addedProducts.reduce((accumulator, currentProduct) => {
          return accumulator + currentProduct.priceUpdated;
        }, 0);
      }
    },
    updateQuantity(state, action) {
      const { id, operation } = action.payload;
      const index = state.addedProducts.findIndex((obj) => obj.id == id);
      if (index >= 0){
        if (operation == 'sum'){
          state.addedProducts[index].quantity += 1;
          state.addedProducts[index].priceUpdated = state.addedProducts[index].quantity * state.addedProducts[index].standardPrice;
        } else if (operation == 'sub' && state.addedProducts[index].quantity > 1){
          state.addedProducts[index].quantity -= 1;
          state.addedProducts[index].priceUpdated = state.addedProducts[index].quantity * state.addedProducts[index].standardPrice;
        }
        state.totalPrice = (state.discountGranted>0 ? state.discountGranted : 1) * state.addedProducts.reduce((accumulator, currentProduct) => {
          return accumulator + currentProduct.priceUpdated;
        }, 0);
      }
    },
    removeProduct(state, action) {
      const id = action.payload;
      const newProducts = state.addedProducts.filter((obj) => obj.id != id);
      state.addedProducts = newProducts;
      state.totalPrice = (state.discountGranted>0 ? state.discountGranted : 1) * state.addedProducts.reduce((accumulator, currentProduct) => {
        return accumulator + currentProduct.priceUpdated;
      }, 0);
    },
    // updateTotalPrice(state, action){
    //   state.totalPrice = action.payload - (state.discountGranted);
    // },
    updateAppliedCouponsFromStorage(state, action){
      state.appliedCoupons.push(action.payload);
      state.discountGranted = Math.pow(0.85, state.appliedCoupons.length);
      state.totalPrice = (state.discountGranted>0 ? state.discountGranted : 1) * state.addedProducts.reduce((accumulator, currentProduct) => {
        return accumulator + currentProduct.priceUpdated;
      }, 0);
    },
    checkout(state, action){
      state.addedProducts = [];
      state.totalPrice = 0;
      state.appliedCoupons = [];
      state.discountGranted = 0;      
    }
  },
});

export const { addProduct, updateTotalPrice, updateQuantity, removeProduct, updateAppliedCouponsFromStorage, checkout } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
