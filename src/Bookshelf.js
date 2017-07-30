import React, { Component } from 'react'
import BookGrid from './BookGrid.js'

class Bookshelf extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Bookshelf</h2>
        <div className="bookshelf-books">
          <BookGrid />
        </div>
      </div>
      )
  }
}

export default Bookshelf;
