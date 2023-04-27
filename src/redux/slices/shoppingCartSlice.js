import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    addedProducts: localStorage.getItem("addedProducts") ? JSON.parse(localStorage.getItem("addedProducts")) : [],
    totalPrice: localStorage.getItem("totalPrice") ? JSON.parse(localStorage.getItem("totalPrice")) : 0,
    appliedCoupons: localStorage.getItem("appliedCoupons") ? JSON.parse(localStorage.getItem("appliedCoupons")) : [],
    couponsAvailable: ['LIVEN', 'TECH', '15OFF']
};

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addProduct(state, action) {
      const product = action.payload;
      const productExists = state.addedProducts.find((p) => p.id === product.id);
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
        });
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
      }
    },
    removeProduct(state, action) {
      const id = action.payload;
      const newProducts = state.addedProducts.filter((obj) => obj.id != id);
      state.addedProducts = newProducts;
      state.totalPrice = state.addedProducts.reduce((accumulator, currentProduct) => {
          return accumulator + currentProduct.priceUpdated;
      }, 0);
    },
    updateTotalPriceFromStorage(state, action){
      state.totalPrice = action.payload;
    },
    updateAppliedCouponsFromStorage(state, action){
      state.appliedCoupons.push(action.payload);
      localStorage.setItem("appliedCoupons", JSON.stringify(state.appliedCoupons));
    }
  },
});

export const { addProduct, updateTotalPriceFromStorage, updateQuantity, removeProduct, updateAppliedCouponsFromStorage } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
