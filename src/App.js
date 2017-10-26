import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './components/ListBooks'
import SearchBooks from './components/SearchBooks'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'

class App extends Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books: books
      })
    })
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)

    let isNew = true
    for (let b of this.state.books) {
      if (b.id === book.id) {
        isNew = false
      }
    }

    if (isNew) {
      this.setState((state) => ({
        books: state.books.concat([ Object.assign({}, book, {shelf: shelf}) ])
      }))
    } else {
      this.setState((state) => ({
        books: state.books.map((b) => b.id === book.id ? Object.assign({}, b, {shelf: shelf}) : b )
      }))
    }
    
  }

  render() {
    return (
      <div className='App'>
        <Route
          exact path='/'
          render={() => (
            <ListBooks books={this.state.books} onUpdateShelf={(book, shelf) => {
              this.updateShelf(book, shelf)
            }} />
          )} />
        <Route
          exact path='/search'
          render={() => (
            <SearchBooks books={this.state.books} onUpdateShelf={(book, shelf) => {
              this.updateShelf(book, shelf)
            }} />
          )} />
      </div>
    )
  }
}

export default App
