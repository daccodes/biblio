import axios from 'axios';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setBooks, setText } from './Store/store.actions';
import { RootState } from '../App';
import Book from './Book';

const BooksContainer = () => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState('ok');
  const [loading, setLoading] = useState(true);
  const word = useSelector((state: RootState) => state.text);

  const books: any = useSelector((state: RootState) => state.books);
  const { items, totalItems }: ReturnType<any> = books;

  const api: string = process.env.REACT_APP_GOOGLE_BOOKS_API as string;

  const search = async (word: string) => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${word}&key=${api}`
      );
      dispatch(setBooks(res.data));
      dispatch(setText(''));
      setLoading(false);
    } catch (err) {
      console.log(err);
      setStatus('help');
    }
  };

  useEffect(() => {
    if (word === '' && Array.isArray(books) === false) {
      setLoading(false);
    } else {
      if (word !== '') {
        search(word);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word]);

  if (!loading) {
    if (books === undefined) {
      return (
        <h3>
          Sfortunatamente non ho trovato nessun libro in base alla tua ricerca
        </h3>
      );
    } else {
      return (
        <div className="col-span-12">
          <p className="py-16 text-center">
            Libri: {items.length} di {totalItems} trovati
          </p>
          <div className="grid grid-cols-10">
            {items.map((item: ReturnType<any>) => {
              return <Book book={item} />;
            })}
          </div>{' '}
        </div>
      );
    }
  } else {
    if (status === 'help') {
      return <Navigate to="/" />;
    } else {
      return (
        <div className="col-span-12 grid justify-items-center">
          {word !== '' ? (
            <div className="my-4">
              <img
                src="/loading.gif"
                alt="loading"
                width={'50px'}
                height={'50px'}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      );
    }
  }
};

export default BooksContainer;
