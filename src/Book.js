import React, { Component } from 'react'
import camelCase from 'lodash/camelCase';
import PropTypes from 'prop-types';

class Book extends Component {
  state = {
    resultBookShelf: 'none'
  }

  static propTypes = {
    myBook: PropTypes.object,
    resultBook: PropTypes.object,
    shelfChangeHandler: PropTypes.func.isRequired,
    shelves: PropTypes.array.isRequired,
    books: PropTypes.array
  }

  handleShelfSelection = (e) => {
    let book = this.props.book || this.props.resultBook;
    this.props.shelfChangeHandler(book, e.target.value);
    this.setState({
      resultBookShelf: e.target.value
    })
  }

  componentDidMount = () => {
    if (this.props.resultBook) {
      this.syncResultWithBookShelf(this.props.resultBook)
    }
  }

  syncResultWithBookShelf = (result) => {
    let matchingBook = this.props.books.filter((book) => {
      return book.id === result.id
    })
    if (matchingBook.length > 0) {
      this.setState({
        resultBookShelf: matchingBook[0].shelf
      })
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
              <select value={ this.props.resultBook ? this.state.resultBookShelf :book.shelf } onChange={ this.handleShelfSelection }>
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
