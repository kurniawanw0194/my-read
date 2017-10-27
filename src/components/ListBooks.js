import React from 'react'
import { Link } from 'react-router-dom'
import Shelf from './Shelf'
import PropTypes from 'prop-types'

const ListBooks = (props) => {
  const { books, onUpdateShelf } = props
  
  return (
    <div className='list-books'>
      <div className='list-books-title'>
        <h1>MyReads</h1>
      </div>
      <div className='list-books-content'>
        <div>
          <Shelf title='Currently Reading' books={books.filter((book) => book.shelf === 'currentlyReading')} onUpdateShelf={onUpdateShelf} />
          <Shelf title='Want To Read' books={books.filter((book) => book.shelf === 'wantToRead')} onUpdateShelf={onUpdateShelf} />
          <Shelf title='Read' books={books.filter((book) => book.shelf === 'read')} onUpdateShelf={onUpdateShelf} />
        </div>
      </div>
      <div className='open-search'>
        <Link to='/search'>Add a book</Link>
      </div>
    </div>
  )
}

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  onUpdateShelf: PropTypes.func.isRequired
}

export default ListBooks