import React, { Component } from 'react'

class SearchBooksBar extends Component {
  render() {
    return (
      <div className="search-books-bar">
        <a className="close-search">Close</a>
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title or author" />
        </div>
      </div>
    )
  }
}

export default SearchBooksBar;
