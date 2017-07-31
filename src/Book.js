import React, { Component } from 'react'
import BookshelfChanger from './BookshelfChanger.js';

class Book extends Component {
  render() {
    let bookCover = this.props.book.imageLinks.thumbnail;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${bookCover})` }}></div>
            <BookshelfChanger shelf={this.props.book.shelf}/>
          </div>
          <div className='book-title'>{this.props.book.title}</div>
          <div className="book-authors">{this.props.book.authors.join(', ')}</div>
        </div>
      </li>
      )
  }
}

export default Book;
