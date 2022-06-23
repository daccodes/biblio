import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { RootState } from '../App';
import { pushCart } from './Store/store.actions';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';

const SingleBook = () => {
  const { text } = useParams<string>();
  const books = useSelector((state: RootState) => state.books);
  const cart = useSelector((state: RootState) => state.cart);
  const { items }: ReturnType<any> = books || {};
  //const currentBook = useSelector((state: RootState) => state.currentBook);
  const currentBook = items.find((item: any) => item.id === text);
  const dispatch = useDispatch();
  const [booked, setbooked] = useState(false);
  /*
  useEffect(() => {
    if (currentBook === [])
      try {
        const thisbook = items.find((item: any) => item.id === text);

        dispatch(setCurrentBook(thisbook.volumeInfo));
      } catch (error) {
        console.log(error);
      }
  }, []);*/

  const {
    imageLinks,
    title,
    authors,
    industryIdentifiers,
    publisher,
    pageCount,
    averageRating,
    ratingsCount,
    publishedDate,
  }: ReturnType<any> = currentBook.volumeInfo;
  return (
    <>
      {currentBook.volumeInfo[1] ? (
        <></>
      ) : (
        <div className=" max-w-4xl mx-auto grid grid-cols-6">
          <div className=" md:col-span-1 col-span-6 grid justify-items-center">
            <img
              className="mx-auto py-8 w-32 h-64"
              src={
                imageLinks === undefined
                  ? '/defaultcover.png'
                  : imageLinks.thumbnail
              }
              alt={title}
            />
            <div>
              <Rater
                total={5}
                rating={averageRating ? averageRating : 0}
                interactive={false}
              />

              <span className="pl-2 text-xs">
                {ratingsCount ? ratingsCount : 0}
              </span>
            </div>
          </div>
          <div className="md:ml-10 mx-6 pt-10 md:col-span-5 col-span-6">
            <p>
              {' '}
              {'📕  '}
              {/*authors.map((item: string) => (
                <span>{item}</span>
              ))*/}
              <span>{authors ? authors.toString() : 'unknown author'}</span>
              <span className="ml-3">{`< ${publishedDate?.slice(
                0,
                4
              )} >`}</span>
            </p>
            <p className="text-xl font-bold mt-6 mb-2">{title}</p>
            <p>
              <button
                className={`${
                  booked ? 'bg-opacity-60' : ''
                } px-2 py-1 bg-red-800 text-white text-sm rounded-xl`}
                onClick={() => {
                  if (
                    cart.find(
                      (item) =>
                        item.volumeInfo.title === currentBook.volumeInfo.title
                    ) !== undefined
                  ) {
                    alert('non puoi aggiungere 2 volte lo stesso libro!');
                  } else {
                    dispatch(pushCart(currentBook));
                    setbooked(true);
                  }
                }}
                disabled={booked}
              >
                {'🛒 Prenota'}
              </button>
            </p>
            <p className="my-3">{publisher ? publisher : 'Publisher: -'}</p>
            <p className="text-sm leading-6 mt-8">{`ISBN: ${industryIdentifiers[1]?.identifier}`}</p>
            <p className="text-sm">{`Total Pages: ${pageCount}`}</p>
            <Link to="/">
              <p className="mx-auto mt-10 px-2 py-1 border rounded-xl text-center bg-red-800 text-white w-48">
                Torna alla ricerca
              </p>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleBook;
