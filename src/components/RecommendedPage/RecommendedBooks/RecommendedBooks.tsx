import { useSelector } from 'react-redux';
import css from './RecommendedBooks.module.css';
import { selectRecommendedBooks } from '../../../redux/books/selectors';
import BooksPagination from '../BooksPagination/BooksPagination';
import { useModal } from '../../../context';
import ModalBookInfo from '../ModalBookInfo/ModalBookInfo';

export interface Book {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  totalPages: number;
}

const RecommendedBooks = () => {
  const books = useSelector(selectRecommendedBooks);
  const { openModal } = useModal();

  const handleBookClick = (book: Book) => {
    openModal(() => <ModalBookInfo book={book} />);
  };

  return (
    <div className={css.container}>
      <div className={css.paginationWrapper}>
        <h2 className={css.title}>Recommended</h2>
        <BooksPagination />
      </div>
      <ul className={css.booksList}>
        {books.map(book => (
          <li
            key={book._id}
            className={css.booksItem}
            onClick={() => handleBookClick(book)}
          >
            <img src={book.imageUrl} alt={book.title} className={css.image} />
            <div className={css.textWrapper}>
              <h3 className={css.bookTitle}>{book.title}</h3>
              <p className={css.bookAuthor}>{book.author}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendedBooks;
