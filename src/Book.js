import React, { Component } from 'react'
import camelCase from 'lodash/camelCase';
import PropTypes from 'prop-types';


export default class Book extends Component {
  static propTypes = {
    myBook: PropTypes.object,
    resultBook: PropTypes.object,
    shelfChangeHandler: PropTypes.func.isRequired,
    changeSearchResultShelf: PropTypes.func,
    shelves: PropTypes.array.isRequired,
  }


  /**
   * @description Handles user selection of shelf for each Book's bookshelf changer. For both
   * resultBooks and myBooks, shelfChangeHandler is called to handle updating the book's shelf
   * on the server and to update the myBooks state to reflect the change. For resultBooks,
   * searchResultShelfChangeHandler is also called to handle updating the searchResults state
   * to reflect the change.
   * @param {change Event} event
   */
  handleShelfSelection = (event) => {
    if (this.props.resultBook) {
      this.props.shelfChangeHandler(this.props.resultBook, e.target.value);
      this.props.searchResultShelfChangeHandler(this.props.resultBook, e.target.value);
    } else {
      this.props.shelfChangeHandler(this.props.myBook, e.target.value);
    }
  }


  render() {
    let book;
    // Set book to either the resultBook or myBook for convenience of avoiding several conditionals
    // in the jsx below.
    if (this.props.resultBook) {
      book = this.props.resultBook;
    } else {
      book = this.props.myBook;
    }

    return (
      <li>
        <div className="book">

          <div className="book-top">

            { book.imageLinks !== undefined &&
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
            }

            <div className="book-shelf-changer">
              <select value={ book.shelf } onChange={ this.handleShelfSelection }>
                <option value="0" disabled>Move to...</option>
                { this.props.shelves.map((shelf) => {
                return (
                <option key={ shelf } value={ camelCase(shelf) }>{ shelf }</option>
                );
                }) }
                <option value="none">None</option>
              </select>
            </div>

          </div>

          <div className='book-title'>{ book.title }</div>
          { book.authors !== undefined &&
          <div className="book-authors">{ book.authors.join(', ') }</div>
          }

        </div>
      </li>
      )
  }
}
