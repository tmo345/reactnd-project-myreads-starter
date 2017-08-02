import React, { Component } from 'react'
import SearchBooksBar from './SearchBooksBar.js'
import Bookshelf from './Bookshelf.js';
import * as BooksAPI from './BooksAPI.js';
import PropTypes from 'prop-types';

class Search extends Component {
  static propTypes = {
    shelves: PropTypes.array.isRequired
  }

  state = {
    query: '',
    searchResults: []
  }

  updateQuery = (newQuery) => {
    this.setState({ query: newQuery.trim() })
  }

  updateSearchResults = (results) => {
    this.setState({ searchResults: results })
  }


  handleSearch = (newQuery) => {
    if (newQuery.trim() !== '') {
      BooksAPI.search(newQuery, 20)
        .then((books) => {
          this.updateQuery(newQuery.trim());
          this.updateSearchResults(books);
        }, () => {
          this.updateQuery('');
          this.updateSearchResults([])
        })
    } else {
      this.updateSearchResults([]);
    }
  }


  render() {
    return (
      <div className="search-books">
        <SearchBooksBar handleSearch={this.handleSearch} />
        <div className="search-books-results">
          { this.state.searchResults.length > 0 &&
            <Bookshelf shelves={this.props.shelves} books={this.state.searchResults} shelfChangeHandler={this.props.shelfChangeHandler}/>
          }
        </div>
      </div>
    )
  }
}

export default Search;
