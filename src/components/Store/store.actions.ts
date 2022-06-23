import { createAction } from '@reduxjs/toolkit';

export const setText = createAction<string>('setText');
export const setBooks = createAction<[]>('setBooks');
export const pushCart = createAction<[]>('pushCart');
export const setCart = createAction<[]>('setCart');
