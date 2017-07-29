import React, { Component } from 'react'
import Bookshelf from './Bookshelf.js'

class MyReads extends Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>My Reads</h1>
        </div>
        <div className="list-books-content">
          <Bookshelf />
          <Bookshelf />
          <Bookshelf />
        </div>
      </div>
    )
  }
}
 export default MyReads;
