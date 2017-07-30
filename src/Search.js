import React, { Component } from 'react'
import SearchBooksBar from './SearchBooksBar.js'
import SearchBooksResults from './SearchBooksBar.js';

class Search extends Component {
  render() {
    return (
      <div className="search-books">
        <SearchBooksBar />
        <SearchBooksResults />
      </div>
    )
  }
}

export default Search;
