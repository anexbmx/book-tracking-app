import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom';
import MainPage from './books/MainPage';
import SearchPage from './books/SearchPage';
import * as BooksApi from './BooksAPI';


class BooksApp extends React.Component {

  state = {
    books: []
  }

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks = () => {
    BooksApi.getAll().then((books) => {
      this.setState({ books });
    })
  }

  getBooksByShelf = shelf => this.state.books.filter((book) => book.shelf === shelf)

  afterUpdateBook = () => { this.fetchBooks(); }

  render() {
    return (
      <div>
        <Route exact path="/" render={() => (
          <MainPage
            booksCurrentlyReading={this.getBooksByShelf("currentlyReading")}
            booksWantToRead={this.getBooksByShelf("wantToRead")}
            booksRead={this.getBooksByShelf("read")}
            afterUpdateBook={this.afterUpdateBook} />
        )
        } />

        <Route exact path="/search" render={() => (
          <SearchPage books={this.state.books} afterUpdateBook={this.afterUpdateBook} />
        )
        } />


      </div>
    )
  }
}

export default BooksApp
