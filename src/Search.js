import React, { Component } from 'react'
import SearchBooksBar from './SearchBooksBar.js'
import Bookshelf from './Bookshelf.js'

class Search extends Component {
  render() {
    return (
      <div className="search">
        <SearchBooksBar />
        <Bookshelf />
      </div>
    )
  }
}

export default Search;
