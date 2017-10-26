import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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

  // Formatting authors to display on the screen
  showAuthors = (authors) => {
    const totalAuthor = authors.length
    return authors.map((author, i) => {
      if (totalAuthor === i + 1) {
        return author
      } else {
        return author + ', '
      }
    })
  }

  render() {
    const { books, onUpdateShelf } = this.props
    const { query, searchedBooks } = this.state

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
            <input type="text" placeholder="Search by title or author" value={query} onChange={(e) => this.updateQuery(e.target.value)}/>
          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
            {searchedBooks.map((book) => (
              <li key={book.id}>
                <div className='book'>
                  <div className='book-top'>
                    <div className='book-cover' style={{ width: 128, height: 188, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : ''})` }}></div>
                    <div className='book-shelf-changer'>
                      <select defaultValue={book.shelf ? book.shelf : 'none'} onChange={(e) => onUpdateShelf(book, e.target.value)}>
                        <option value='none' disabled>Move to...</option>
                        <option value='currentlyReading'>Currently Reading</option>
                        <option value='wantToRead'>Want to Read</option>
                        <option value='read'>Read</option>
                        <option value='none'>None</option>
                      </select>
                    </div>
                  </div>
                  <div className='book-title'>{book.title}</div>
                  {book.authors && (
                    <div className='book-authors'>
                      {this.showAuthors(book.authors)}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }

}

export default SearchBooks