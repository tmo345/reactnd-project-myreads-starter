import React, { Component } from 'react';
import startCase from 'lodash/startCase';

class BookshelfChanger extends Component {
  shelfOptions = [
    'currentlyReading',
    'wantToRead',
    'read',
    'none'
  ];

  render() {
    return (
      <div className="book-shelf-changer">
        <select value={this.props.shelf}>
          <option value="none" disabled>Move to...</option>
          { this.shelfOptions.map((shelfOption) => {
            return (
              <option value={shelfOption}>{ startCase(shelfOption) }</option>
            );
          }) }
        </select>
      </div>
      );
  }
}

export default BookshelfChanger;
