import { useState, useEffect } from "react";
import initialBooks from "../data/books.json";

export interface Book {
  id: string;
  name: string;
  author: string;
  category: string;
  price: number;
  description: string;
  image: string;
}

const STORAGE_KEY = "innorik-books";

const getStoredBooks = (): Book[] => {
  const storedBooks = localStorage.getItem(STORAGE_KEY);
  if (storedBooks) {
    return JSON.parse(storedBooks);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialBooks));
  return initialBooks;
};

export const useBookStore = () => {
  const [books, setBooks] = useState<Book[]>(getStoredBooks());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  }, [books]);

  const addBook = (newBookData: Omit<Book, "id">) => {
    const newBook = {
      ...newBookData,
      id: `new-${Date.now()}`,
    };
    setBooks((prevBooks) => [newBook, ...prevBooks]);
  };

  const updateBook = (updatedBook: Book) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
  };

  const deleteBook = (bookId: string) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
  };

  return { books, addBook, updateBook, deleteBook };
};
