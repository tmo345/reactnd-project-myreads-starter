import React, { Component } from 'react'
import Bookshelf from './Bookshelf.js'
import camelCase from 'lodash/camelCase';

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
          { this.props.shelves.map((shelf) => {
            return (
              <div key={shelf} className="bookshelf">
                <h2 className="bookshelf-title">{shelf}</h2>
                <Bookshelf
                  shelves={ this.props.shelves }
                  books={ this.sortBooks(camelCase(shelf)) }
                  shelfChangeHandler={ this.props.shelfChangeHandler }
                />
              </div>
            )
          })}

        </div>
        <div className="open-search">
          <a href="/search">Add a book</a>
        </div>
      </div>
    )
  }
}
 export default MyReads;
