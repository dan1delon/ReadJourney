import css from './ModalBookInfo.module.css';
import { Book } from '../RecommendedBooks/RecommendedBooks';
import { useDispatch, useSelector } from 'react-redux';
import {
  addRecommendedBook,
  deleteBook,
  fetchOwnBooks,
} from '../../../redux/books/operations';
import { AppDispatch } from '../../../redux/store';
import { selectUsersBooks } from '../../../redux/books/selectors';
import { useEffect } from 'react';

interface ModalBookInfoProps {
  book: Book;
}

const ModalBookInfo: React.FC<ModalBookInfoProps> = ({ book }) => {
  const dispatch = useDispatch<AppDispatch>();
  const usersBooks = useSelector(selectUsersBooks);

  useEffect(() => {
    dispatch(fetchOwnBooks({}));
  }, [dispatch]);

  const existingBook = usersBooks.find(b => b.title === book.title);

  const handleAddToLibrary = () => {
    dispatch(addRecommendedBook(book._id));
  };

  const handleDeleteFromLibrary = () => {
    if (existingBook) {
      dispatch(deleteBook(book._id));
    }
  };

  return (
    <div className={css.container}>
      <img src={book.imageUrl} alt={book.title} className={css.image} />
      <div className={css.textWrapper}>
        <h3 className={css.bookTitle}>{book.title}</h3>
        <p className={css.bookAuthor}>{book.author}</p>
        <p className={css.bookPages}>{book.totalPages} pages</p>
      </div>

      {existingBook ? (
        <button
          type="button"
          className={css.button}
          onClick={handleDeleteFromLibrary}
          aria-label="Remove book from library"
        >
          Remove from library
        </button>
      ) : (
        <button
          type="button"
          className={css.button}
          onClick={handleAddToLibrary}
          aria-label="Add book to library"
        >
          Add to library
        </button>
      )}
    </div>
  );
};

export default ModalBookInfo;
