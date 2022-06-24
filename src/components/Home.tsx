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
      <div className="md:col-span-2 md:grid hidden" />
      <div className="md:col-span-2 col-span-12">
        <h1 className="py-4 text-center">Cerca un libro:</h1>
      </div>

      <div className="md:col-span-6 col-span-12 p-1 md:mx-0">
        <div className="grid grid-cols-12 mx-2 gap-2">
          <div className="col-span-7">
            <input
              type="text"
              name="booksearch"
              onChange={(e) => setInputText(e.target.value)}
              value={inputText}
              ref={inputRef}
              placeholder={placeholder}
              className="p-3 border-2 border-black rounded-xl h-14 w-full"
            />
          </div>
          <div className="col-span-3">
            <button
              type="button"
              onClick={handleClick}
              className=" w-14 text-center md:w-full h-14 bg-slate-400 rounded-xl border-2 border-black col-span-2 hover:bg-slate-400"
            >
              🔎 <span className="hidden md:inline">search</span>
            </button>
          </div>
          <div className="col-span-2 md:hidden flex">
            <button onClick={() => setShowCart(!showCart)}>
              <span className="px-4 py-4 border-2 rounded-xl border-black bg-yellow-300 ">
                🛒 <span className="hidden md:inline">cart</span>
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="md:col-span-2 md:flex md:justify-end mx-auto hidden">
        <button onClick={() => setShowCart(!showCart)} className="">
          <span className="px-4 py-4 border-2 rounded-xl border-black bg-yellow-300 ">
            🛒 <span className="hidden md:inline">cart</span>
          </span>
        </button>
      </div>
      {showCart && <Cart state={setShowCart} />}
      {showContainer && <BooksContainer />}
    </div>
  );
};

export default Home;
