import React, { Component } from 'react'
import Book from './Book.js';
import PropTypes from 'prop-types';

class Bookshelf extends Component {
  static propTypes = {
    myBooks: PropTypes.array,
    searchResults: PropTypes.array,
    shelfChangeHandler: PropTypes.func.isRequired,
    shelves: PropTypes.array.isRequired
  }

  /**
  * @description Render grid of myBooks for main page or a grid of searchResults for search page.
  * @returns {ReactElement}
  */
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
                  shelves={this.props.shelves}
                  shelfChangeHandler={this.props.shelfChangeHandler}
                  changeSearchResultShelf={this.props.changeSearchResultShelf}
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
            { this.props.myBooks.map((book, index) => {
              return (
                <Book
                  key={index}
                  myBook={book}
                  shelves={this.props.shelves}
                  shelfChangeHandler={this.props.shelfChangeHandler}
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
