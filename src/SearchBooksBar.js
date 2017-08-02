import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link  } from 'react-router-dom';

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
        <Link to="/"
          className="close-search"
        >Close</Link>
        <div className="search-books-input-wrapper">
          <input type="text" onInput={this.handleQueryChange} placeholder="Search by title or author" />
        </div>
      </div>
    )
  }
}

export default SearchBooksBar;
