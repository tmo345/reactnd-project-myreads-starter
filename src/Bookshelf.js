import React, { Component } from 'react'
import Book from './Book.js';
import PropTypes from 'prop-types';


export default class Bookshelf extends Component {
  static propTypes = {
    myBooks:            PropTypes.array,
    searchResults:      PropTypes.array,
    shelves:            PropTypes.array.isRequired,
    shelfChangeHandler: PropTypes.func.isRequired,
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
                  searchResultShelfChangeHandler={this.props.searchResultShelfChangeHandler}
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
