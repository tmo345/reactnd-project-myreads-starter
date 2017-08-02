import React, { Component } from 'react'
import SearchBooksBar from './SearchBooksBar.js'
import Bookshelf from './Bookshelf.js';
import * as BooksAPI from './BooksAPI.js';
import PropTypes from 'prop-types';

class Search extends Component {
  static propTypes = {
    shelves: PropTypes.array.isRequired,
    myBooks: PropTypes.array.isRequired
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
        .then((results) => {
          this.updateQuery(newQuery.trim());

          let syncedResults = this.syncResultsWithBooks(results);
          this.updateSearchResults(syncedResults);
        }, () => {
          this.updateQuery('');
          this.updateSearchResults([])
        })
    } else {
      // If query is empty, clear results
      this.updateSearchResults([]);
    }
  }

  syncResultsWithBooks = (results) => {
    let syncedResults = results.map((result) => {
      let matchingBook = this.props.myBooks.find((myBook) => {
        return result.id === myBook.id;
      });
      if (matchingBook) {
        return Object.assign({}, result, { shelf: matchingBook.shelf })
      } else {
        return result;
      }
    });
    return syncedResults;
  }

  render() {
    return (
      <div className="search-books">
        <SearchBooksBar handleSearch={this.handleSearch} />
        <div className="search-books-results">
          { this.state.searchResults.length > 0 &&
          <Bookshelf
            books={this.props.books}
            shelves={this.props.shelves}
            searchResults={this.state.searchResults}
            shelfChangeHandler={this.props.shelfChangeHandler}
            syncResultWithBookShelf={this.syncResultWithBookShelf}
          />

        }
      </div>
    </div>
    )
  }
}

export default Search;
