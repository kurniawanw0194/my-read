import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import ListBooks from './components/ListBooks'
import SearchBooks from './components/SearchBooks'
import ErrorPage from './components/ErrorPage'
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
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf
      this.setState((state) => ({
        books: state.books.filter((b) => b.id !== book.id).concat([book])
      }))
    })
    
  }

  render() {
    return (
      <div className='App'>
        <Switch>
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
          <Route
            component={ErrorPage} />
        </Switch>
      </div>
    )
  }
}

export default App
