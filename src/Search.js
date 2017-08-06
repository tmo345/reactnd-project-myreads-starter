import React, { Component } from 'react';
import SearchBooksBar from './SearchBooksBar.js';
import Bookshelf from './Bookshelf.js';
import * as BooksAPI from './BooksAPI.js';
import PropTypes from 'prop-types';


export default class Search extends Component {

  static propTypes = {
    shelves:            PropTypes.array.isRequired,
    myBooks:            PropTypes.array.isRequired,
    shelfChangeHandler: PropTypes.func.isRequired,
    closeSearchHandler: PropTypes.func.isRequired
  };

  state = {
    query: '',
    searchResults: []
  };

  /**
   * @description Sets query state.
   * @param {string} newQuery Search string entered into search input bar.
   */
  updateQuery = (newQuery) => {
    this.setState({ query: newQuery });
  };

  /**
   * @description Sets searchResults state.
   * @param {Book[]} results Array of Books, from a BooksAPI.search call for example.
   */
  updateSearchResults = (results) => {
    this.setState({ searchResults: results });
  };

  /**
   * @description Reset state to original empty query string and empty searchResults array.
   */
  resetState = () => {
    this.setState({
      query: '',
      searchResults: []
    });
  };

  /**
   * @description Clear searchResults state to empty array.
   */
  clearSearchResults = () => {
    this.setState({
      searchResults: []
    });
  };

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
   * @description Tests for valid query, which should be a non-empty string.
   * @param   {string} query Search string entered into search input bar.
   * @returns {Bool}         True if valid, False if invalid
   */
  isValidQuery = (query) => {
    if (typeof query !== 'string' || query.trim().length === 0) {
      return false;
    } else {
      return true;
    }
  };

  /**
   * @description Check for presence of error property on results parameter. If the BooksAPI.search
   * call does not return any Books, it instead returns an object { error: "empty query", items:
   * []}. The presence of the error property on results indicates that no Book results returned.
   * @param   {Book[] | {error: string, items: Array}} results
   * @returns {Bool} True if Book results returned | False if no Book results returned
   */
  resultsReturned = (results) => {
    if (results.hasOwnProperty('error')) {
      return false;
    } else {
      return true;
    }
  };

  /**
   * @description Sync searchResults Book.shelf properties with any matching Books in myBooks.
   * This is done prior to setting searchResults state to ensure that books on the main page and
   * the search page have the same bookshelf state.
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
  };

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
          return Object.assign({}, searchResult, { shelf: shelf });
        } else {
          return searchResult;
        }
      })
    });
  };

  /**
   * @description Render app routes
   * @returns {ReactElement}
   */
  render() {
    return (
      <div className="search-books">
        <SearchBooksBar
          handleSearch={this.handleSearch}
          closeSearchHandler={this.props.closeSearchHandler}
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
    );
  };
}
