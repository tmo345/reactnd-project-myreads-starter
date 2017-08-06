import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link  } from 'react-router-dom';

export default class SearchBooksBar extends Component {
  static propTypes = {
    handleSearch:       PropTypes.func.isRequired,
    closeSearchHandler: PropTypes.func.isRequired
  }

  /**
   * @description Handles onInput event for search books bar input element. The input represents a
   * user search query. handleSearch is called with value of query to initiate search of BooksAPI
   * and state management by Search component.
   * @param {input Event} event
   */
  handleQueryChange = (event) => {
    this.props.handleSearch(event.target.value);
  }

  /**
  * @description Renders input for search query entry and Link back to My Reads page.
  * @returns {ReactElement}
  */
  render() {
    return (
      <div className="search-books-bar">
        <Link to="/"
          className="close-search"
          onClick={this.props.closeSearchHandler}
        >Close</Link>
        <div className="search-books-input-wrapper">
          <input type="text" onInput={this.handleQueryChange} placeholder="Search by title or author" />
        </div>
      </div>
    )
  }
}
