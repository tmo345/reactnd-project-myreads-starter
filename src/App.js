import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'
import MyReads from './MyReads.js'
import Search from './Search.js'

class BooksApp extends React.Component {
  state ={
    myBooks: []
  }

  shelves = [
    'Currently Reading',
    'Want to Read',
    'Read'
  ];

  componentDidMount = () => {
    BooksAPI.getAll().then((myBooks) => {
      this.setState({ myBooks });
    });
  }

  shelfChangeHandler = (bookToChange, shelf) => {
    BooksAPI.update(bookToChange, shelf)
      .then(this.updateBookshelf(bookToChange, shelf));
    }

  /**
   * @description Map over current state.books. When book.id equals the
   * bookToChange.id, use object.assign to create a new book object
   * with the updated shelf. Set the state to the array of books
   * returned from the map. State now contains the book with the update
   * shelf and the book will be rerendered in the appropriate shelf.
   *
   * Modeled after example on page 102 of Fullstack React, Fullstack.io
   * Accomazzo et al.
   *
   * @param {book}   bookToChange
   * @param {string} shelf
   * @return undefined
   */
  updateBookshelf = (bookToChange, shelf) => {
    this.setState({
      myBooks: this.state.myBooks.map((myBook) => {
        if (bookToChange.id === myBook.id) {
          return Object.assign({}, myBook, {
           shelf: shelf
        }) } else {
          return myBook;
        }
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <MyReads
            shelves={this.shelves}
            myBooks={this.state.myBooks}
            shelfChangeHandler={this.shelfChangeHandler}
          />
        )}/>
        <Route path="/search" render={() => (
          <Search
            myBooks={this.state.myBooks}
            shelves={this.shelves}
            shelfChangeHandler={this.shelfChangeHandler}
          />
        )}/>
      </div>
    )
  }

}

export default BooksApp
