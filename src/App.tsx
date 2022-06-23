//import './App.css';
import Main from './components/Main';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {
  textReducer,
  booksReducer,
  cartReducer,
} from './components/Store/store.reducers';

const rootReducer = combineReducers({
  text: textReducer,
  books: booksReducer,
  cart: cartReducer,
});

export const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof rootReducer>;

function App() {
  return (
    <Provider store={store}>
      <Main />{' '}
    </Provider>
  );
}

export default App;

