import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI';
import BookShelf from './BookShelf';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

export default class SearchPage extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            books: []
        }
        this.inputStream = new BehaviorSubject()
    }

    componentDidMount() {

        this.inputStream
            .pipe(
                debounceTime(400),
                distinctUntilChanged()
            )
            .subscribe(value => {
                if (!value)
                    return this.setState({ books: [] });
                this.getBooks(value)
            })
    }

    getBooks = (value) => {

        BooksAPI.search(value).then((books) => {
            if (books && books.length > 0) {
                books.map((book) => {
                    let bookWithShelf = this.props.books.find(b => b.id === book.id);
                    book.shelf = bookWithShelf ? bookWithShelf.shelf : "none";
                    return book;
                })
                this.setState({ books })
            } else
                this.setState({ books: [] })
        })
    }

    render() {
        const { books } = this.state;
        const { afterUpdateBook } = this.props;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/">
                        <button className="close-search" >Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">

                        <input onChange={e => this.inputStream.next(e.target.value)}
                            type="text" placeholder="Search by title or author" />

                    </div>
                </div>
                <div className="search-books-results">
                    <BookShelf afterUpdateBook={afterUpdateBook}
                        books={books}
                        title="Search..." />
                </div>
            </div>
        )
    }
}