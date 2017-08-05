import React, { Component } from 'react'
import camelCase from 'lodash/camelCase';
import PropTypes from 'prop-types';

class Book extends Component {
  static propTypes = {
    myBook: PropTypes.object,
    resultBook: PropTypes.object,
    shelfChangeHandler: PropTypes.func.isRequired,
    changeSearchResultShelf: PropTypes.func,
    shelves: PropTypes.array.isRequired,
  }

  handleShelfSelection = (e) => {
    if (this.props.resultBook) {
      this.props.shelfChangeHandler(this.props.resultBook, e.target.value);
      this.props.searchResultShelfChangeHandler(this.props.resultBook, e.target.value);
    } else {
      this.props.shelfChangeHandler(this.props.myBook, e.target.value);
    }
  }


  render() {
    let book;
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

export default Book;
