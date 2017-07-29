import React, { Component } from 'react'
import Book from './Book.js'

class Bookshelf extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2>Bookshelf</h2>
        <ol>
          <Book />
          <Book />
        </ol>
      </div>
      )
  }
}

export default Bookshelf;
