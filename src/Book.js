import React, { Component } from 'react'
import camelCase from 'lodash/camelCase';
import PropTypes from 'prop-types';

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    shelfChangeHandler: PropTypes.func.isRequired,
    shelves: PropTypes.array.isRequired
  }

  handleShelfSelection = (e) => {
    this.props.shelfChangeHandler(this.props.book, e.target.value)
  }

  render() {
    const book = this.props.book;
    return (
      <li>
        <div className="book">

          <div className="book-top">

            { book.imageLinks !== undefined &&
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
            }

            <div className="book-shelf-changer">
              <select value={ book.shelf } onChange={ this.handleShelfSelection }>
                <option value="none" disabled>Move to...</option>
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
