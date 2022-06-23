import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../App';
import { setCart } from './Store/store.actions';

const Cart = ({ state }: ReturnType<any>) => {
  const cart: ReturnType<any> = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const [buttonText, setButtonText] = useState('Send Order!');

  const removeBook = (book: any) => {
    const newcart = cart.filter((item: any) => {
      return item !== book;
    });
    console.log(...newcart);
    dispatch(setCart(newcart));
  };
  return (
    <div
      aria-hidden="true"
      tabIndex={-1}
      className=" overflow-y-auto overflow-x-hidden bg-slate-800 bg-opacity-70 fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
    >
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto mx-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-slate-200">
          <div className="flex flex-row-reverse pt-4 pr-4">
            <button
              className="py-2 px-4 rounded-xl bg-white border border-black"
              onClick={() => state(false)}
            >
              x
            </button>
          </div>
          <div className="pb-[2rem]">
            <p className="text-center text-2xl mb-4 pb-8">Cart</p>
            <hr className="bg-slate-800 bg-opacity-60 h-1" />
            {cart.length > 0 && (
              <>
                {cart.map((book: ReturnType<any>) => (
                  <div className="grid grid-cols-8 mx-10 mt-9">
                    <span className="text-sm md:col-span-7 col-span-7">
                      {book.volumeInfo.title}
                    </span>
                    <button
                      onClick={() => removeBook(book)}
                      className="ml-5 text-xl bg-white rounded-full border md:col-span-1 col-span-1 w-8 h-8"
                    >
                      🗑
                    </button>
                  </div>
                ))}
                <div className="flex justify-center pt-16 ">
                  <button
                    onClick={() => {
                      setButtonText('Sent!');
                      setTimeout(() => {
                        dispatch(setCart([]));
                      }, 1600);
                    }}
                    className="px-3 py-1 border rounded-xl bg-slate-800 text-white"
                  >
                    {buttonText}
                  </button>
                </div>
              </>
            )}
          </div>
          {cart.length === 0 && (
            <div className="text-center pt-[2rem] pb-[3rem]">
              Nel carrello non è presente alcun ordine
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
