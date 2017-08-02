import React, { Component } from 'react'
import Bookshelf from './Bookshelf.js'
import camelCase from 'lodash/camelCase';
import PropTypes from 'prop-types';
import { Link  } from 'react-router-dom';

class MyReads extends Component {
  static propTypes = {
    myBooks: PropTypes.array.isRequired,
    shelfChangeHandler: PropTypes.func.isRequired,
    shelves: PropTypes.array.isRequired
  }

  sortBooks(shelf) {
    return this.props.myBooks.filter((myBook) => {
      return myBook.shelf === shelf;
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
                  myBooks={ this.sortBooks(camelCase(shelf)) }
                  shelfChangeHandler={ this.props.shelfChangeHandler }
                />
              </div>
            )
          })}

        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}
 export default MyReads;
