import React, { Component } from 'react'
import Bookshelf from './Bookshelf.js'

class MyReads extends Component {
  render() {
    return (
      <div className="bookshelves">
        <h1>My Reads</h1>
        <Bookshelf />
        <Bookshelf />
        <Bookshelf />
      </div>
    )
  }
}
 export default MyReads;
