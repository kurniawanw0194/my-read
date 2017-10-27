import React from 'react'
import PropTypes from 'prop-types'

const Book = (props) => {

  const { book, onUpdateShelf } = props

  let authorsToString = ''
  if (book.authors) {
    const totalAuthor = book.authors.length
    authorsToString = book.authors.map((author, i) => {
      if (totalAuthor === i + 1) {
        return author
      } else {
        return author + ', '
      }
    })
  }

  return (
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
          {authorsToString}
        </div>
      )}
    </div>
  )
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onUpdateShelf: PropTypes.func.isRequired
}

export default Book