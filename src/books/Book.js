import React from 'react'
import * as BooksApi from '../BooksAPI';


export default class Book extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            book: {}
        }
    }

    componentDidMount() {
        this.setState({
            book: {...this.props.book}
        })
    }
    
    moveBook = (shelf) => {
        BooksApi.update(this.state.book, shelf).then((result) => {
            let book = this.state.book;
            book.shelf = shelf;
            this.setState({ book });
            this.props.afterUpdateBook();
        })
    }

    render() {
        const { book } = this.state;
        return (
            <li >
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks && book.imageLinks.thumbnail}")` }}></div>
                        <div className="book-shelf-changer">
                            <select value={book.shelf}
                                onChange={(event) => this.moveBook(event.target.value)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors && book.authors[0]}</div>
                </div>
            </li>
        )
    }
}