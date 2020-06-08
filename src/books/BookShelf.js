
import React from 'react'
import Book from './Book';
export default class BookShelf extends React.Component {

    render() {
        const { title, books, afterUpdateBook } = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                       {
                           books && books.map( (book) => ( <Book key={book.id} afterUpdateBook={afterUpdateBook} book={book}/> )) 
                       }
                     </ol>
                </div>
            </div>
        )
    }
}