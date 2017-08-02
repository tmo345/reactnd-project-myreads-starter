import React, { Component } from 'react'
import Book from './Book.js';
import PropTypes from 'prop-types';

class Bookshelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    searchResults: PropTypes.array,
    shelfChangeHandler: PropTypes.func.isRequired,
    shelves: PropTypes.array.isRequired
  }

  render() {
    if (this.props.searchResults) {
      return (
        <div className="bookshelf-books">
          <ol className="books-grid">
            { this.props.searchResults.map((book, index) => {
              return (
                <Book
                  key={index}
                  resultBook={book}
                  books={this.props.books}
                  shelfChangeHandler={this.props.shelfChangeHandler}
                  shelves={this.props.shelves}
                  syncResultWithBookShelf={this.props.syncResultWithBookShelf}
                />
              );
              })
            }
          </ol>
        </div>
      );
    } else {
      return (
        <div className="bookshelf-books">
          <ol className="books-grid">
            { this.props.books.map((book, index) => {
              return (
                <Book
                  key={index}
                  book={book}
                  shelfChangeHandler={this.props.shelfChangeHandler}
                  shelves={this.props.shelves}
                />
              );
              })
            }
          </ol>
        </div>
      );
    }
  }
}

export default Bookshelf;
