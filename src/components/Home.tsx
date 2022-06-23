import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../App';
import BooksContainer from './BooksContainer';
import Cart from './cart';
import { setText } from './Store/store.actions';

const Home = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const books = useSelector((state: RootState) => state.books);

  const [inputText, setInputText] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const dispatch = useDispatch();
  const [showContainer, setShowContainer] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const handleClick = () => {
    if (inputText === '') {
      setPlaceholder('Compila il campo!');
      inputRef.current?.focus();
    } else {
      dispatch(setText(inputText));
      setShowContainer(true);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (books !== null || books !== undefined) {
      setShowContainer(true);
    } else {
      setShowContainer(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid grid-cols-12 md:max-w-6xl mx-auto md:border-slate-400 md:border-2 py-5">
      <div className="md:col-span-3 md:grid hidden" />
      <div className="md:col-span-2 col-span-12">
        <h1 className="py-4 text-center">Cerca un libro:</h1>
      </div>

      <div className="md:col-span-3 col-span-9 rounded-xl border-2 border-black p-1 md:mx-0 mx-1 pr-0">
        <input
          type="text"
          name="booksearch"
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
          ref={inputRef}
          placeholder={placeholder}
          className="p-3 border-2 border-black border-l-0 border-t-0 border-b-0 h-12"
        />

        <button
          type="button"
          onClick={handleClick}
          className="md:py-1 md:px-4 md:w-1/4 w-[28%] h-12 bg-slate-400 rounded-tr-lg rounded-br-lg  hover:bg-slate-400 md:text-left text-center"
        >
          Cerca
        </button>
      </div>
      <div className="md:col-span-2 col-span-3 flex md:justify-end mx-auto">
        <button onClick={() => setShowCart(!showCart)} className="">
          <span className="px-4 py-4 border-2 rounded-xl border-black bg-yellow-300 ">
            🛒 cart
          </span>
        </button>
      </div>
      {showCart && <Cart state={setShowCart} />}
      {showContainer && <BooksContainer />}
    </div>
  );
};

export default Home;
