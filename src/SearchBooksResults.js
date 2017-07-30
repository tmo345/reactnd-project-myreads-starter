import React, { Component } from 'react';
import BookGrid from './BookGrid.js';

class SearchBooksResults extends Component {
  render() {
    return (
      <div className="search-books-results">
        <BookGrid />
      </div>
    )
  }
}

export default SearchBooksResults;
