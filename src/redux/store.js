import { configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import shoppingCartReducer, { updateTotalPriceFromStorage } from './slices/shoppingCartSlice.js';



const middlewareProducts = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type === 'shoppingCart/addProduct' || action.type === 'shoppingCart/updateQuantity' || action.type === 'shoppingCart/removeProduct'){
    const state = store.getState();
    const totalPrice = state.shoppingCart.addedProducts.reduce((accumulator, currentProduct) => {
      return accumulator + currentProduct.priceUpdated;
    }, 0);
    localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
    localStorage.setItem("addedProducts", JSON.stringify(state.shoppingCart.addedProducts));
    store.dispatch(updateTotalPriceFromStorage(totalPrice));
  }
  return result;
};

const store = configureStore({
  reducer: {
    shoppingCart: shoppingCartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewareProducts),
});

export default store;
