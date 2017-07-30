import React, { Component } from 'react'
import Bookshelf from './Bookshelf.js'

class MyReads extends Component {
  sortBooks(shelf) {
    return this.props.books.filter((book) => {
      return book.shelf === shelf;
    })
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>My Reads</h1>
        </div>
        <div className="list-books-content">
          <Bookshelf title="Currently Reading" books={this.sortBooks('currentlyReading')}/>
          <Bookshelf title="Want to Read" books={this.sortBooks('wantToRead')}/>
          <Bookshelf title="Read" books={this.sortBooks('read')}/>
        </div>
        <div className="open-search">
          <a href="/search">Add a book</a>
        </div>
      </div>
    )
  }
}
 export default MyReads;
