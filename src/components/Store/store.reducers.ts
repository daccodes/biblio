import { createReducer } from '@reduxjs/toolkit';
import { setText, setBooks, setCart, pushCart } from './store.actions';

export const textReducer = createReducer('', (builder) =>
  builder.addCase(setText, (state, action) => action.payload)
);

export const booksReducer = createReducer([], (builder) =>
  builder.addCase(setBooks, (state, action) => action.payload)
);

export const cartReducer = createReducer([] as Array<any>, (builder) =>
  builder
    .addCase(pushCart, (state, action) => {
      const cartItem = action.payload;
      state.push(cartItem);
    })

    .addCase(setCart, (state, action) => action.payload)
);
