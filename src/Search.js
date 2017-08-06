import React, { Component } from 'react'
import SearchBooksBar from './SearchBooksBar.js'
import Bookshelf from './Bookshelf.js';
import * as BooksAPI from './BooksAPI.js';
import PropTypes from 'prop-types';

export default class Search extends Component {

  static propTypes = {
    shelves: PropTypes.array.isRequired,
    myBooks: PropTypes.array.isRequired
  }

  state = {
    query: '',
    searchResults: []
  }

  /**
   * @description Sets query state.
   * @param {string} newQuery Search string entered into search input bar.
   */
  updateQuery = (newQuery) => {
    this.setState({ query: newQuery })
  }

  /**
   * @description Sets searchResults state.
   * @param {Book[]} results Array of Books, from a BooksAPI.search call for example.
   */
  updateSearchResults = (results) => {
    this.setState({ searchResults: results })
  }

  /**
   * @description Reset state to original empty query string and empty searchResults array.
   */
  resetState = () => {
    this.setState({
      query: '',
      searchResults: []
    })
  }


  /**
   * @description Clear searchResults state to empty array.
   */
  clearSearchResults = () => {
    this.setState({
      searchResults: []
    })
  }

  /**
   * @description Tests for valid query: non-empty string
   * @param   {string} query
   * @returns {Bool} True if valid, False if invalid
   */
  isValidQuery = (query) => {
    if (typeof query !== 'string' || query.trim().length === 0) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * @description Check results object for presence of 'error' property, which signifies search
   * returned 0 results
   * @param  {Book[] | {error: string, items: Array} } results Books.search API returns either an
   * array of Book objects or an object with an error property if search does not return Book
   * results.
   * @returns {Bool} True if Book results returned | False if no Book results returned
   */
  resultsReturned = (results) => {
    if (results.hasOwnProperty('error')) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * @description Handles searching BooksAPI for books to add to main page bookshelves.
   *
   * For project, only queries in SEARCH_TERMS.md return results. If query validates,
   * query state is updated and sent with ajax call BooksAPI.search. A promise is
   * returned.
   *   On fulfillment:
   *    - If results return, the bookshelf state is synced between search results and
   *      the user's bookshelves. The searchResults state is then updated with synced
   *      results.
   *    - If no results return, clear search Results.
   *   On rejection:
   *    - Reset query and searchResults state
   *
   * @param   {string} newQuery Search string input to search input bar.
   */
  handleSearch = (newQuery) => {
    if (! this.isValidQuery(newQuery)) {
      this.resetState();
      return;
    } else {
      var validQuery = newQuery.trim();
      this.updateQuery(validQuery);
    }

    BooksAPI.search(validQuery, 20)
      .then((results) => {
        if (this.resultsReturned(results)) {
          let syncedResults = this.syncResultsWithMyBooks(results);
          this.updateSearchResults(syncedResults);
        } else {
          this.clearSearchResults();
        }
      }, (err) => {
        this.resetState();
        console.log(err.message);
      });
  }

  /**
   * @description Sync searchResults and myBooks shelf property. Maps over results and
   * if a results Book is present in both results and myBooks, that
   * @param   {Book[]} searchResults
   * @returns {Book[]} syncedResults
   */
  syncResultsWithMyBooks = (searchResults) => {
    let syncedResults = searchResults.map((searchResult) => {
      let matchingBook = this.props.myBooks.find((myBook) => {
        return searchResult.id === myBook.id;
      });
      if (matchingBook) {
        return Object.assign({}, searchResult, { shelf: matchingBook.shelf })
      } else {
        return searchResult;
      }
    });
    return syncedResults;
  }


  /**
   * @description On selection of a new shelf for a Book in searchResults, update the searchResults
   * state to reflect change to new shelf.
   * @param {Book}   resultBookToChange Book on results page whose shelf will be changed.
   * @param {string} shelf              The new shelf for resultBookToChange.
   */
  searchResultShelfChangeHandler = (resultBookToChange, shelf) => {
    this.setState({
      searchResults: this.state.searchResults.map((searchResult) => {
        if (searchResult.id === resultBookToChange.id) {
          return Object.assign({}, searchResult, { shelf });
        } else {
          return searchResult;
        }
      })
    })
  }

  /**
   * @description Render app routes
   * @returns {ReactElement}
   */
  render() {
    return (
      <div className="search-books">
      <SearchBooksBar
      handleSearch={this.handleSearch}
      handleCloseSearch={this.props.handleCloseSearch}
      />
      <div className="search-books-results">
      { this.state.searchResults.length > 0 &&
        <Bookshelf
        books={this.props.books}
        shelves={this.props.shelves}
        searchResults={this.state.searchResults}
        shelfChangeHandler={this.props.shelfChangeHandler}
        searchResultShelfChangeHandler={this.searchResultShelfChangeHandler}
        />
      }
      </div>
      </div>
    )
  }
}
