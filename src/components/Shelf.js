import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

const Shelf = (props) => {

  const { title, books, onUpdateShelf } = props

  return (
    <div className='bookshelf'>
      <h2 className='bookshelf-title'>{title}</h2>
      <div className='bookshelf-books'>
        <ol className='books-grid'>
          {books.map((book) => (
            <li key={book.id}>
              <Book book={book} onUpdateShelf={onUpdateShelf} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

Shelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onUpdateShelf: PropTypes.func.isRequired
}

export default Shelf