import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Debounce } from 'react-throttle'
import Book from './Book'
import * as BooksAPI from './../utils/BooksAPI'

class SearchBooks extends Component {

  state = {
    query: '',
    searchedBooks: []
  }

  updateQuery = (query) => {
    this.setState({
      query: query
    })
    if (query) {
      this.searchBooks(query)
    } else {
      this.setState({
        searchedBooks: []
      })
    }
  }

  searchBooks = (query) => {
    BooksAPI.search(query).then((result) => {
      if (result.error === undefined) {
        this.setState({
          searchedBooks: result
        })
      } else {
        this.setState({
          searchedBooks: []
        })
      }
    })
  }

  render() {
    const { books, onUpdateShelf } = this.props
    const { searchedBooks } = this.state

    // Synchronize the shelf with owned books
    for (let book of books) {
      for (let searchBook of searchedBooks) {
        if (book.id === searchBook.id) {
          searchBook.shelf = book.shelf
        }
      }
    }

    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <Debounce time='400' handler='updateQuery'>
              <input type="text" placeholder="Search by title or author" onChange={(e) => this.updateQuery(e.target.value)}/>
            </Debounce>
          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
            {searchedBooks.map((book) => (
              <li key={book.id}>
                <Book book={book} onUpdateShelf={onUpdateShelf} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }

}

export default SearchBooks