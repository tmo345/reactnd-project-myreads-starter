import React, { Component } from 'react'
import SearchBooksBar from './SearchBooksBar.js'
import Bookshelf from './Bookshelf.js';

class Search extends Component {
  state = {
    query: '',
    searchResults: []
  }

  render() {
    return (
      <div className="search-books">
        <SearchBooksBar />
        <Bookshelf shelves={this.props.shelves} books={this.state.searchResults}/>
      </div>
    )
  }
}

export default Search;
