import React, { Component } from 'react'
import PropTypes from 'prop-types';

class SearchBooksBar extends Component {
  static propTypes = {
    handleSearch: PropTypes.func.isRequired
  }

  handleQueryChange = (event) => {
    this.props.handleSearch(event.target.value);
  }

  render() {
    return (
      <div className="search-books-bar">
        <a href="/" className="close-search">Close</a>
        <div className="search-books-input-wrapper">
          <input type="text" onInput={this.handleQueryChange} placeholder="Search by title or author" />
        </div>
      </div>
    )
  }
}

export default SearchBooksBar;
