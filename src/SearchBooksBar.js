import React, { Component } from 'react'

class SearchBooksBar extends Component {
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
