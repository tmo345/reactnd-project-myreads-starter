import React, { Component } from 'react'
import Book from './Book.js'

class Bookshelf extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Bookshelf</h2>
        <ol className="books-grid">
          <Book />
          <Book />
        </ol>
      </div>
      )
  }
}

export default Bookshelf;
