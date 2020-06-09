
import React from 'react'
import Book from './Book';
import * as BooksApi from '../BooksAPI';

export default class BookShelf extends React.Component {

    moveBook = (shelf, book, index) => {
        console.log(this.props.updateShelfBook)
        console.log(book, shelf, index)
        BooksApi.update(book, shelf).then((result) => {
            book.shelf = shelf;
            if (this.props.updateShelfBook)
                this.props.updateShelfBook(index, book);
            this.props.afterUpdateBook();
        })
    }

    render() {
        const { title, books } = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            books && books.map((book, index) => (
                                <Book key={book.id}
                                    index={index}
                                    moveBook={this.moveBook}
                                    book={book} />)
                            )
                        }
                    </ol>
                </div>
            </div>
        )
    }
}