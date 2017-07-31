import React, { Component } from 'react'
import Book from './Book.js';

class Bookshelf extends Component {
  render() {
    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {this.props.books.map((book) => {
          return (
          <Book
            key={book.id} book={book}
            shelfChangeHandler={this.props.shelfChangeHandler}
            shelves={this.props.shelves}
          />
          )
            })}
          </ol>
        </div>
        )
  }
}

export default Bookshelf;
