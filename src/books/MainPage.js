
import React from 'react'
import BookShelf from './BookShelf';
import { Link } from 'react-router-dom';


export default class MainPage extends React.Component {


    render() {
        const { booksCurrentlyReading, booksWantToRead, booksRead, afterUpdateBook } = this.props;
        return (
            <div className="app">
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        <div>
                            <BookShelf afterUpdateBook={afterUpdateBook}
                                books={booksCurrentlyReading}
                                title="Currently Reading" />
                            <BookShelf afterUpdateBook={afterUpdateBook}
                                books={booksWantToRead}
                                title="Want to Read" />
                            <BookShelf afterUpdateBook={afterUpdateBook}
                                books={booksRead}
                                title="Read" />
                        </div>
                    </div>
                    <div className="open-search">

                        <Link to="/search">
                            <button >Add a book</button>
                        </Link>

                    </div>
                </div>

            </div>
        )
    }
}