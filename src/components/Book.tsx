import { Link } from 'react-router-dom';

const Book = ({ book, key }: ReturnType<any>) => {
  const { volumeInfo }: ReturnType<any> = book || {};
  return (
    <div className="md:col-span-2 col-span-5" key={key}>
      <Link className="hover" to={`/${book.id}`}>
        <img
          className="mx-auto py-8 w-32 h-64"
          src={
            volumeInfo.imageLinks === undefined
              ? '/defaultcover.png'
              : volumeInfo.imageLinks.thumbnail
          }
          alt={volumeInfo.title}
        />
      </Link>
      <div className="px-2 text-sm text-center font-bold ">
        {volumeInfo.title}
      </div>
      <div className="py-4 text-center">
        {volumeInfo.authors === undefined
          ? 'Autore sconosciuto'
          : volumeInfo.authors.map((author: string) => {
              return <span key={author}>{author}</span>;
            })}
      </div>
    </div>
  );
};

export default Book;
