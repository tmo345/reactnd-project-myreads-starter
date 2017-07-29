import React, { Component } from 'react'
import SearchBooksBar from './SearchBooksBar.js'
import Bookshelf from './Bookshelf.js'

class Search extends Component {
  render() {
    return (
      <div className="search-books">
        <SearchBooksBar />
        // TODO: make component to wrap around Bookshelf to conditionally render main page Bookshelf versus Search
        // page Bookshelf
        <Bookshelf />
      </div>
    )
  }
}

export default Search;
